const log4js = require('log4js')
// log4js.configure({
//     appenders: {},
//     categories: {}
// })
const appLogger = log4js.getLogger('application')
appLogger.level = 'debug'

module.exports = {
    application: appLogger
}
