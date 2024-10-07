import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN || '');

bot.command('start', (ctx) => {
  ctx.reply('Welcome to the mini-game!');
});

bot.hears('score', async (ctx) => {
  // const playerScore = await getPlayerScore(ctx.from.id); // Retrieve player score from MongoDB
  // ctx.reply(`Your score: ${playerScore}`);
});

export default bot;