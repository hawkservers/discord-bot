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

import {Collection} from 'discord.js';
import LogSystem from './utils/Logging';
import fs from 'fs';
import Path from 'path';
import {config} from 'dotenv';
config();

export default class CommandSystem {
  constructor(client, commandPath = Path.join(__dirname, 'commands')) {
    this.logger = LogSystem.getLogger('Command System');
    this.commands = new Collection();
    this.path = commandPath;
    this.client = client;
  }

  loadCommands(path = this.path) {
    const CommandPaths = fs.readdirSync(path);
    for (let i = 0; i < CommandPaths.length; i++) {
      const command = CommandPaths[i];

      if (fs.statSync(Path.join(path, command)).isDirectory()) {
        this.logger.debug('Found path', command);
        this.loadCommands(Path.join(path, command));
      } else if (Path.extname(command) === '.js') {
        this.logger.debug('Loading command', command);
        const tempCommand = new (require(Path.join(path, command)).default)();

        if (this.commands.has(tempCommand.commandName)) {
          this.logger.warn('Duplicate command name', tempCommand.commandName);
          continue;
        }

        this.commands.set(tempCommand.commandName, tempCommand);
      }
    }
  }

  runCommand(command, message, args = []) {
    this.logger.trace('Running Command', command);
    if (!this.commands.has(command)) {
      if (process.env.COMMAND_NOT_FOUND === 'true') {
        message.reply(`Sorry but the command \`${command}\` does not exist.`);
      }

      return
    }

    const commandInstance = this.commands.get(command);
    return commandInstance.run(message, args, this.client);
  }
}