const logger = require('../tools/logger').application
const dataService = require('../service/data')

module.exports = {

GET: async (ctx, next) => {
    logger.info('[API] data/get')
    await next()
    let _data = await dataService.getOriginAndEchartsData()
    ctx.body = _data
    return
}

}
