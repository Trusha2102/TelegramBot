const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Send initial message with persistent inline keyboard menu
    bot.sendMessage(chatId, 'Hey, what’s up?', {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '\u2630 Menu', callback_data: 'menu' }]
            ]
        })
    });
});

// Handle menu button selection and other commands
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === 'menu') {
        // Edit message to display full menu options (customizable)
        bot.editMessageText('Choose an option:', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    // Your menu options here
                ]
            })
        });
    } else if (query.data === 'start') {
        // Handle 'Start' button selection (customizable)
        bot.answerCallbackQuery(query.id);
        bot.sendMessage(chatId, 'Hey, what’s up? (Selected Start)'); // Replace with desired action
    } else if (query.data === 'exit') {
        // Handle 'Exit' button selection (customizable)
        bot.answerCallbackQuery(query.id);
        bot.sendMessage(chatId, 'Sorry to see you going. Bye for now');
    }
});
