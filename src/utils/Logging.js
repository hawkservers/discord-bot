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

import * as Log from 'log4js';
import {config} from 'dotenv';
config();

Log.configure({
  appenders: {
    out: {
      type: 'stdout',
    },
    app: {
      type: 'dateFile',
      filename: 'logs/HawkDiscord.log',
      compress: true,
    },
    appFilter: {
      type: 'logLevelFilter',
      appender: 'app',
      level: process.env.LOG_LEVEL,
    },
    errors: {
      type: 'file',
      filename: 'logs/Errors.log',
    },
    errorsFilter: {
      type: 'logLevelFilter',
      appender: 'errors',
      level: 'error',
    }
  },
  categories: {
    default: {
      appenders: ['appFilter', 'out', 'errorsFilter'],
      level: 'trace',
    },
  },
});

export default Log;
