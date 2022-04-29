# ZHKSB API

张贺凯名言API，使用 ExpressJS 重构

## 使用方法

### 开发

```bash
npm install -g yarn
yarn install
yarn tsc
yarn dev
```

在每次更新typescript代码后，执行 `yarn tsc` 后，程序会自动reload。

### 启动程序

程序运行需要 Node.js 14 及以上

```bash
npm install -g yarn
yarn install
yarn pm2:init
```

```bash
yarn pm2:init # 初始化进程配置
yarn pm2:stop # 暂停所有进程
yarn pm2:start # 重启所有进程
yarn pm2:delete # 删除进程配置
```

### 调用

一言 API 位于 `/api/text`，你可以使用GET方法调用。

可用的Param有：

* `type`: 可以为 text/json/jsonp/xml/html
* `key`: 在特定type时会替换key的内容

例如：

* `/api/text?type=text` 输出普通文字
* `/api/text?type=html` 输出网页
* `/api/text?type=json` 输出json数据，格式为`{"text": "aaabbb"}`
* `/api/text?type=json&key=zhktext` 输出json数据，格式为`{"zhktext": "aaabbb"}`
