# kk-deep-factory

在 DeepSeek Harness Web 中打开「我的工厂」，查看机加工车间的三维设备布局、设备台账与 OEE。遇到设备反复短停时，可以直接和工厂总管对话。

## 让 AI 同事协作

1. 在「设备工作台」选择设备，查看日期、停机记录与效率损失。
2. 在「AI 同事」告诉总管「请安排处理 MC-07 的反复短停」。总管核对当前异常，按需要委派生产损失分析员、设备诊断员和维修计划员。分析、依据和待确认的方案会回到对话中。
3. 确认适用的方案后，维修计划员可以在本插件内建立工单并回读状态。现场人员记录执行结果和复机检查，授权人员完成验收。也可以点开某位同事单独追问。

## 安装与数据

运行环境为 DeepSeek Harness Web、Node.js 24.9 或更新版本、Python 3.11 或更新版本（含标准库 SQLite）。请先在 Harness 配好可用的默认模型。插件会调用当前宿主的模型服务。

```sh
dsh plugin --profile web add https://github.com/kbr19930409/kk-deep-factory.git
```

在 Web 配置档启用该插件后，从侧边栏进入「我的工厂」。如果宿主提供「我的 AI 同事」专家目录，可从输入框的加号打开目录。

首次启动会在本机生成 12 台设备最近七个完整日班的示例记录。宿主运行期间，设备管理适配器按北京时间每日 08:05 更新前一日记录。接入实际工厂时，需要配置数据来源或使用数据导入功能。

工单和聊天记录按安装环境保存于 `<DSH 配置档>/data/kk-deep-factory/factory.sqlite`。可在宿主环境设置 `KK_DEEP_FACTORY_DATA_DIR` 指定独立的绝对目录，用 `FACTORY_PYTHON` 指定 Python 解释器。升级后沿用同一数据目录即可继续使用已有记录。

宿主面板面向当前工作区所有者。三维界面使用 Three.js，随包附有 [Three.js 版权和许可](THIRD-PARTY-NOTICES/Three.js-MIT.txt)。

## License

本项目采用 MIT 许可证，见 [LICENSE](LICENSE)。
