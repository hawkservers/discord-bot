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

import CommandBase from "../../CommandBase";

export default class Ping extends CommandBase {
  constructor() {
    super();

    this.commandName = 'ping';
  }

  async run(message,__, client) {
    return message.channel.send(`${client.ping}ms. \u{1F3D3}`);
  }
}