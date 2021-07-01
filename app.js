const koa = require('koa');
const koaRouter = require('koa-router');
const koaJson = require('koa-json');
const koaBodyParser = require('koa-bodyparser');
const mysql = require('mysql');

const app = new koa();
app.use(koaBodyParser());
app.use(koaJson());
const router = new koaRouter();

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
