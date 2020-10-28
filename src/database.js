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
// Handle the MongoDB connection and return the connected database.
// =========================================================================

const MongoClient = require('mongodb').MongoClient
const format = require('util').format
const config = require('./config/config.js')
const log = require('./utils/logger.js')

// Configuration
// =========================================================================

const url = format('mongodb://%s:%d/%s', config.HOST, config.DB_PORT, config.DB_NAME)

// Connection
// =========================================================================

exports.connect = function (callback) {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    if (err) {
      log.fatal('Error during the database connection : ' + err.message)
      throw err
    }

    log.info('Connected to database "' + config.DB_NAME + '" on port ' + config.DB_PORT)

    return callback(null, client)
  })
}
