const Koa    = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const views  = require('koa-views')

const _      = require('lodash')
const path   = require('path')
const app = new Koa()
const router = new Router()

const logger = require('./src/tools/logger').application

const controller = require('./src/controller')
for (let url of Object.keys(controller)) {
  for (let method of Object.keys(controller[url])) {
    router[method.toLowerCase()](url, controller[url][method])
  }
}

const port = process.env.PORT || 8080

app
  .use(static(path.join(__dirname, './src/views')))
  .use(views(path.join(__dirname, './src/views/templates')))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)
logger.info('pcap2echarts has been started at port', port)
