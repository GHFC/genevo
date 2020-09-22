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
// Download a FASTA from the external folder for the requested gene
// =========================================================================

const fs = require('fs')
const path = require('path')

// =========================================================================

const rootPath = process.env.GENEVO_APP_FASTA_PATH

module.exports = function (req, res) {
  const fileName = `${req.params.file}.fasta`
  const filePath = path.join(rootPath, fileName)
  const exists = fs.existsSync(filePath)

  if (!exists) return res.status(404).send('No fasta file found for this gene')

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName)
  fs.createReadStream(filePath).pipe(res)
}
