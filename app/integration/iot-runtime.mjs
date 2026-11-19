import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {createServer} from 'node:net';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {existsSync} from 'node:fs';

const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

/** A separate Node-RED process. Only the business child receives its read token. */
export function createIoTRuntime({database}={}) {
  const runtime=fileURLToPath(new URL('../iot/runtime.mjs',import.meta.url));
  const installed=existsSync(fileURLToPath(new URL('../iot/node_modules/node-red/package.json',import.meta.url)));
  const readToken=randomBytes(32).toString('hex'),writeToken=randomBytes(32).toString('hex');
  const dataDir=database?join(dirname(database),'iot-platform'):fileURLToPath(new URL('../data/iot-platform',import.meta.url));
  let child,ready,port,stopped=false;
  async function boot(){
    port ||= await new Promise((resolve,reject)=>{const s=createServer();s.once('error',reject);s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
    if(stopped)throw new Error('IoT进程已停止');
    child=spawn(process.execPath,[runtime],{cwd:dirname(runtime),windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,
      FACTORY_IOT_PORT:String(port),FACTORY_IOT_READ_TOKEN:readToken,FACTORY_IOT_WRITE_TOKEN:writeToken,FACTORY_IOT_DATA_DIR:dataDir}});
    let exited=false;
    child.once('error',()=>{exited=true;ready=undefined;});child.once('exit',()=>{exited=true;ready=undefined;});
    child.stdout.on('data',()=>{});child.stderr.on('data',()=>{});
    for(let i=0;i<100;i++){
      if(stopped)throw new Error('IoT进程已停止');
      if(exited)throw new Error('IoT进程未启动');
      try{const r=await fetch(`http://127.0.0.1:${port}/health`,{headers:{'X-Factory-IoT-Token':readToken},signal:AbortSignal.timeout(500)});if(r.ok&&!stopped)return;}catch{}
      await pause(100);
    }
    child.kill();throw new Error('IoT进程启动超时');
  }
  return {
    async start(){if(stopped||!installed||!existsSync(runtime))return;await (ready ||= boot().catch(error=>{ready=undefined;throw error;}));},
    environment(){return !stopped&&installed&&port?{FACTORY_IOT_URL:`http://127.0.0.1:${port}`,FACTORY_IOT_READ_TOKEN:readToken}:{};},
    async close(){
      stopped=true;const starting=ready;
      if(child&&!child.killed){const exited=new Promise(resolve=>child.once('exit',resolve));child.kill();await Promise.race([exited,pause(2000)]);}
      await starting?.catch(()=>{});
    },
  };
}
