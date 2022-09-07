const { Markup, Composer } = require('telegraf')
const composer = new Composer()

composer.start(async(ctx) => {
    await ctx.reply('👋')
    await ctx.reply(`Hello,${ctx.message.from.first_name} , here you can create notes with statuses.\nEnter any you want, without restriction\nTry! It's easy😜 `)
})

composer.on('message', async(ctx) => {
    const deleteMessage = async() => {
        await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
    }
    setTimeout(deleteMessage, 60000)
    await ctx.reply(`${ctx.message.text}`, Markup.inlineKeyboard([
        [Markup.button.callback('Done✅', 'done'), Markup.button.callback('Delete❌', 'delete')]
    ]))
})

composer.action('done', async(ctx) => {
    await ctx.answerCbQuery()
        // await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    await ctx.editMessageText('✅✅✅✅✅✅✅✅✅  \n' + ctx.update.callback_query.message.text + '\n✅✅✅✅✅✅✅✅✅ ', Markup.inlineKeyboard([
        [Markup.button.callback('Delete❌', 'delete')]
    ]))
})

composer.action('delete', async(ctx) => {
    await ctx.answerCbQuery()
    await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
})

module.exports = composer