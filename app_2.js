const Koa = require('koa');
const Router = require('@koa/router');
const cheerio = require('cheerio');
const superagent = require('superagent');
const app = new Koa();
const router = new Router();
const url = require('url');
const port = 3001;
var cnodeUrl = 'https://cnodejs.org/';

// app.use((ctx, next) => {
//   next();
// });

router.get('/', async (ctx, next) => {
  const res = await superagent.get(cnodeUrl);
  const topic_list = [];
  const $ = cheerio.load(res.text);
  $('#topic_list .topic_title').each(function (idx, element) {
    const $element = $(element);
    const href = url.resolve(cnodeUrl, $element.attr('href'));
    topic_list.push(href);
  })
  ctx.body = topic_list
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("port ===>", port);
});