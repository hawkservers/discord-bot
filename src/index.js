/*
 * Hawk Servers open source Discord bot
 * Copyright (C) 2019 Hawk Servers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import '@babel/polyfill';
import {Client} from 'discord.js'
import {config} from 'dotenv';
import Logging from './utils/Logging';
import CommandSystem from "./CommandSystem";

config();

const bot = new Client({disableEveryone: true});
let logger = Logging.getLogger('Init');
logger.info('Starting Hawk Discord bot');

bot.on('ready', () => {
  logger = Logging.getLogger(bot.user.username);
  logger.debug('Logged in.');

  logger.info('Loading commands');
  bot.CommandSystem = new CommandSystem(bot);
  bot.CommandSystem.loadCommands();
});

bot.on('message', (message) => {
  if (message.author.bot || !message.content.startsWith(process.env.BOT_PREFIX))
    return;

  let args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
  const command = args[0].toLowerCase();
  args.splice(0, 1);

  bot.CommandSystem.runCommand(command, message, args);
});

bot.login(process.env.BOT_TOKEN).catch(e => {
  Logging.getLogger('Error').error('Could not start bot.', e);
});