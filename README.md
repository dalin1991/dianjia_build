# dianjia_build

####Start App
```
  npm install
  npm run build
  npm start
```


####Dev Mode
```
  npm run dev // full stack live reload
```

- app
-- bin //启动项
-- middleware //中间件
---- public //打包后的静态资源
---- routers //注册路由
------ index.js //分类注册
---- server //服务端用，存放打包后的资源名称
------ fileName.json //每次webpack打包后生成
---- source //react源代码，客户端与服务端公用
------ images //图片资源
------ stylesheets //样式资源
---- views //视图模板
```


####getFileNamePlugin
webpack plugin
to print packed files name

params
- fileName (String)
- filePath (String) default is path.join(__dirname);
- extensions (String | Array)

```
new GetFileNamePlugin({
    fileName: 'static.dev.json',
    extensions: ['js', 'css', 'map']
    })
```

output is like
```
{
  [chunkName]: {
    "js": [.., .., ..,]
    "css": [.., .., ..]
  }
}
```
