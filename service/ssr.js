const express = require('express');
const app = express();
const port = 10086;
app.use(async (req, res) => {
  const render = require('../dist/umi.server');
  res.setHeader('Content-Type', 'text/html');
  const context = {};
  const { html, error, rootContainer } = await render({
    // 有需要可带上 query
    path: req.url,
    context,
    // 可自定义 html 模板
    // htmlTemplate: defaultHtml,
    // 启用流式渲染
    // mode: 'stream',
    // html 片段静态标记（适用于静态站点生成）
    // staticMarkup: false,
    // 扩展 getInitialProps 在服务端渲染中的参数
    // getInitialPropsCtx: {},
  });
  // support stream content
  if (content instanceof Stream) {
    html.pipe(res);
    html.on('end', function() {
      res.end();
    });
  } else {
    res.send(res);
  }
});
app.listen(port, () => console.log(`ssr app listening on port ${port}!`));