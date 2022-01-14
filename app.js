const Koa = require("koa");
const Router = require("@koa/router");
const utility = require("utility");

const superagent = require("superagent");
const cheerio = require("cheerio");

const app = new Koa();
const router = new Router();
const port = 3001;

router.get("/", async (ctx, next) => {
  const res = await superagent.get("https://cnodejs.org/");
  const $ = cheerio.load(res.text);
  const items = [];
  $("#topic_list .topic_title").each((idx, element) => {
    const $element = $(element);
    items.push({
      title: $element.attr("title"),
      href: $element.attr("href"),
    });
  });

  ctx.body = items;
});

router.get("/about", (ctx, next) => {
  ctx.body = "介绍页面";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("port ===>", port);
});
