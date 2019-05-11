// The Neanderthal project website
// Copyright (C) 2017 Institut Pasteur
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

// =========================================================================
// The logger of the application.
// It simply outputs the formatted messages on stdout or stderr
// =========================================================================

function log (level, message) {
    
    let timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    let date = new Date(Date.now() - timeZoneOffset)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);

    let line = date + ' ' + level + ': ' + message;

    if (level === 'INFO' || level === 'WARN') console.log(line);
    if (level === 'ERROR' || level === 'FATAL') console.error(line);
}

// =========================================================================

module.exports = {
    info: function (message) { log('INFO', message) },
    warn: function (message) { log('WARN', message) },
    error: function (message) { log('ERROR', message) },
    fatal: function (message) { log('FATAL', message) },
};
