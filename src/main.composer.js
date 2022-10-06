const { Markup, Composer } = require('telegraf')
const composer = new Composer()

composer.start(async(ctx) => {
    await ctx.reply('👋')
    await ctx.reply(`Hello,${ctx.message.from.first_name} , here you can create todos/notes with statuses.\nEnter any you want, without restriction\nTry! It's easy, enjoy 😜 `)
})
composer.on('photo', async(ctx) => {
    try {
        if (ctx.update.message.caption) {
            ctx.replyWithPhoto(ctx.update.message.photo[1].file_id, {
                caption: ctx.update.message.caption,
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.callback('Done✅', 'done-photo'), Markup.button.callback('Delete❌', 'delete')]
                ])
            })
        } else {
            ctx.replyWithPhoto(ctx.update.message.photo[1].file_id, Markup.inlineKeyboard([
                [Markup.button.callback('Done✅', 'done-photo'), Markup.button.callback('Delete❌', 'delete')]
            ]))
        }
        const deleteMessage = async() => {
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
        }
        setTimeout(deleteMessage, 60000)
    } catch (err) {

    }
})
composer.on('message', async(ctx) => {
    try {
        const deleteMessage = async() => {
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
        }
        setTimeout(deleteMessage, 60000)
        await ctx.reply(`${ctx.message.text}`, Markup.inlineKeyboard([
            [Markup.button.callback('Done✅', 'done'), Markup.button.callback('Delete❌', 'delete')]
        ]))
    } catch (err) {

    }
})

composer.action('done-photo', async(ctx) => {
    await ctx.answerCbQuery()
    if (ctx.update.callback_query.message.caption) {
        ctx.editMessageCaption(`✅✅✅✅✅✅✅✅✅  \n ${ctx.update.callback_query.message.caption} \n✅✅✅✅✅✅✅✅✅`, Markup.inlineKeyboard([
            [Markup.button.callback('Delete❌', 'delete')]
        ]))
    } else {
        ctx.editMessageCaption(`✅✅✅✅✅✅✅✅✅`, Markup.inlineKeyboard([
            [Markup.button.callback('Delete❌', 'delete')]
        ]))
    }

})

composer.action('done', async(ctx) => {
    await ctx.answerCbQuery()
    await ctx.editMessageText('✅✅✅✅✅✅✅✅✅  \n' + ctx.update.callback_query.message.text + '\n✅✅✅✅✅✅✅✅✅ ', Markup.inlineKeyboard([
        [Markup.button.callback('Delete❌', 'delete')]
    ]))
})

composer.action('delete', async(ctx) => {
    await ctx.answerCbQuery()
    try {
        await ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    } catch (err) {
        console.log(err)
    }

})

module.exports = composer