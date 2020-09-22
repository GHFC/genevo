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
// Bootstrap function
// =========================================================================

const cast = require('../utils/cast')
const median = require('../utils/median')
const bootstrapping = require('./bootstrap/bootstrapping')
const confidenceInterval = require('./bootstrap/confidence-interval')

// =========================================================================

module.exports = function (req, res, next) {
  const db = req.app.locals.db // Get the database reference
  const collection = db.collection('genes') // Get the collection
  const entrezList = [] // List of Entrez identifiers
  const geneList = [] // List of gene names
  const exactMatch = cast(req.query.exactMatch) // Match exactly the terms or not
  const quality = req.query.quality // The level of quality
  const dndsField = quality + '.AN.HS.OmegaHuguet' // The document field where to find the dnds value

  // ---------------------------------------------------------------------

  // Split the request terms for the database query
  if (req.query.request) {
    req.query.request
      .match(/[^\s,]+/g)
      .map(function (term) {
        return cast(term)
      })
      .forEach(function (term) {
        if (typeof (term) === 'number') {
          entrezList.push(term)
        } else {
          var regex = ''
          if (exactMatch) regex = new RegExp('^' + term + '$', 'i')
          else regex = new RegExp(term, 'i')
          geneList.push(regex)
        }
      })
  }

  // ---------------------------------------------------------------------

  // Build the request
  const query = {
    $or: [
      { EntrezId: { $in: entrezList } },
      { Gene: { $in: geneList } }
    ]
  }

  // Add the lists to the query, if any
  if (req.query.genesLists) {
    req.query.genesLists.forEach(function (name) {
      var req = {}
      req[name] = true
      query.$or.push(req)
    })
  }

  // Select only the fields of interest
  const fields = {
    _id: 0,
    Gene: 1,
    BootstrapBox: 1,
    dNdS: '$' + dndsField
  }

  // ---------------------------------------------------------------------

  // Get the requested genes
  collection
    .aggregate([
      { $match: query },
      { $project: fields }
    ])
    .toArray(function (err, results) {
      if (err) {
        res.status(500).send(err.message)
      }

      // Get the median for those genes
      // -------------------------------------------------------------

      const dndsList = results

        .filter((entry) => {
          return entry.dNdS
        })
        .filter((entry) => {
          return typeof (entry.dNdS) === 'number'
        })
        .map((entry) => {
          return entry.dNdS
        })

      const med = median(dndsList).toFixed(5)

      // Get all the genes in the same boxes to start the bootstrap
      // -------------------------------------------------------------

      // List the bootstrap boxes and the number of genes per box
      const bootstrapBoxes = {}

      results
        .filter((entry) => { return entry.BootstrapBox })
        .forEach((entry) => {
          if (!bootstrapBoxes[entry.BootstrapBox]) {
            bootstrapBoxes[entry.BootstrapBox] = 0
          }

          bootstrapBoxes[entry.BootstrapBox]++
        })

      // Bootstrap
      // -------------------------------------------------------------

      // Set the query
      const query = {
        BootstrapBox: {
          $in: Object.keys(bootstrapBoxes).map(cast)
        }
      }

      query[dndsField] = { $type: 'number' }

      // Get all the genes with the same bootstrap boxes
      collection
        .aggregate([
          { $match: query },
          { $project: fields }
        ])
        .toArray(function (err, results) {
          if (err) {
            res.status(500).send(err.message)
          }

          const distribution = bootstrapping(bootstrapBoxes, results, 'dNdS')
          const confidenceInt = confidenceInterval(distribution)

          res.json({
            median: med,
            confidenceInterval: confidenceInt
          })
        })
    })
}
