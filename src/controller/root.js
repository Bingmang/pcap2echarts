module.exports = {

GET: async(ctx, next) => {
    await next()
    await ctx.render('demo.html')
    return
}

}
