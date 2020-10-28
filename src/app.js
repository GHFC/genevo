// GenEvo
// Copyright (C) 2019 Institut Pasteur
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
// Server for the GenEvo application.
// Handles the configuration, middlewares and graceful exit functions.
// =========================================================================

const path = require('path')
const express = require('express')
const cors = require('cors')
const config = require('./config/config.js')
const Database = require('./database')
const router = require('./router')
const log = require('./utils/logger.js')
const cast = require('./utils/cast.js')

const app = express()

// Proxy
// =========================================================================

let proxy = false

if (config.PROXY) {
  proxy = cast(config.PROXY.toLowerCase())
}

app.set('trust proxy', proxy)

// Middlewares
// =========================================================================

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../dist'), {
  index: 'genevo.html'
}))

// Router
// =========================================================================

app.use('/', router)

// Start
// =========================================================================

log.info('Starting the application')

Database.connect(function (err, client) {
  if (err) {
    log.fatal('Error while connecting to the database: ' + err.message)
    throw err
  }

  // Store the reference of the database
  app.locals.db = client.db(config.DB_NAME)

  app.listen(config.PORT, config.HOST, function () {
    log.info('GenEvo server listening to ' + config.HOST + ' on port ' + config.PORT)
    log.info('Environment: ' + config.ENV)
    log.info('Proxy: ' + proxy)
    log.info('Fasta directory: ' + config.FASTA_PATH)
  })

  // Exit handlers
  // =====================================================================

  const gracefulExit = function (signal, code) {
    client.close(function (err) {
      if (err) {
        log.fatal('Error while closing the connection with the database: ' + err.message)
        throw err
      }

      log.info('Application terminated on ' + signal)
      process.exit(code)
    })
  }

  process.on('SIGINT', function () {
    gracefulExit('SIGINT', 130)
  })

  process.on('SIGTERM', function () {
    gracefulExit('SIGTERM', 143)
  })
})
