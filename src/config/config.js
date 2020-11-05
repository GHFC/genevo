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
// App configuration
// =========================================================================

module.exports = {
  PORT: process.env.GENEVO_APP_PORT || 3000,
  HOST: process.env.GENEVO_APP_HOST || 'localhost',
  DB_HOST: process.env.GENEVO_DB_HOST || 'localhost',
  DB_NAME: process.env.GENEVO_DB_NAME || 'genevo',
  DB_PORT: process.env.GENEVO_DB_PORT || 27017,
  PROXY: process.env.GENEVO_APP_PROXY,
  FASTA_PATH: process.env.GENEVO_APP_FASTA_PATH,
  ENV: process.env.NODE_ENV || 'development'
}
