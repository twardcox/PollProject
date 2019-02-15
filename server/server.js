const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const Resource = require('koa-resource-router');
const path = require('path');
const body = require('koa-bodyparser');
const wrapper = require('./middleware-wrapper');

const bodyMiddleware = wrapper(body()); //need to wrap because koa-resource-router expects a generator pattern
//middleware, whereas koa-bodyparser provides an async pattern
const tech = new Resource('tech', bodyMiddleware, require('./resources/TechUsage'));
const koaApi = new koa();
koaApi.use(tech.middleware());

const koaApp = new koa();
koaApp.use(mount('/api', koaApi));

koaApp.use(serve(path.resolve(__dirname, '../client')));

koaApp.listen(3000);
