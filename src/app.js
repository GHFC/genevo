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
// Server for the Neanderthal application.
// Handles the configuration, middlewares and graceful exit functions.
// =========================================================================

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const Database = require('./database');
// const router = require('./router');
const log = require('./utils/logger.js');
const cast = require('./utils/cast.js');

const app = express();

// Environment
// =========================================================================

const env = process.env.NODE_ENV || "development";

// Proxy
// =========================================================================

let proxy = false;

if (process.env.NEANDERTHAL_APP_PROXY) {
    proxy = cast(process.env.NEANDERTHAL_APP_PROXY.toLowerCase());
}

app.set('trust proxy', proxy);

// Middlewares
// =========================================================================

app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../dist')));

// Router
// =========================================================================

// app.use('/', router);

// Server
// =========================================================================

const port = process.env.NEANDERTHAL_APP_PORT || 3000;
const host = process.env.NEANDERTHAL_APP_HOST || 'localhost';
const name = process.env.NEANDERTHAL_DB_NAME  || 'neanderthal';

// Start
// =========================================================================

log.info('Starting the application');

Database.connect(function (err, client) {

    // Store the reference of the database
    app.locals.db = client.db(name);

    app.listen(port, host, function () {
        log.info('Neanderthal server listening to ' + host + ' on port ' + port);
        log.info('Environment : ' + env);
        log.info('Proxy : ' + proxy);
    });

    // Exit handlers
    // =====================================================================

    const gracefulExit = function (signal, code) {
        client.close(function (err) {
            if (err) {
                log.fatal('Error while closing the connection with the database: ' + err.message);
                throw err;
            }

            log.info("Application terminated on " + signal);
            process.exit(code);
        });
    };

    process.on('SIGINT', function () {
        gracefulExit('SIGINT', 130);
    });

    process.on('SIGTERM', function () {
        gracefulExit('SIGTERM', 143);
    });
});
