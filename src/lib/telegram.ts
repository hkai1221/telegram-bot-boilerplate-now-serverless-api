import {Context as TelegrafContext, Extra} from 'telegraf';
import {ExtraReplyMessage} from 'telegraf/typings/telegram-types';



async function init(bot) {
	const botInfo = await bot.telegram.getMe(bot);
	bot.options.username = botInfo.username;
	console.info('Server has initialized bot username.', botInfo.username);
	bot.startPolling();
}

export async function getWebhookCallback(bot) {
	const botInfo = await bot.telegram.getMe();
	bot.options.username = botInfo.username;
	console.info('Server has initialized bot username.', botInfo.username);
	return bot.webhookCallback
('/' + process.env.BOT_TOKEN);
}

export function toArgs(ctx: TelegrafContext) {
  const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;
  const parts = regex.exec(ctx.message!.text!.trim());
  if (!parts) {
    return [];
  }
  return !parts[3] ? [] : parts[3].split(/\s+/).filter((arg) => arg.length);
}

export const MARKDOWN = Extra.markdown(true) as ExtraReplyMessage;

export const NO_PREVIEW = Extra.markdown(true).webPreview(false) as ExtraReplyMessage;

export const hiddenCharacter = '\u200b';

export default init;
