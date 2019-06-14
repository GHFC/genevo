// Neanderthal Synapse
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
// Search the database for one or many genes
// =========================================================================

const alphanumSort = require ('../utils/alphanumSort');
const cast = require('../utils/cast');
const median = require('../utils/median')
const log = require('../utils/logger');

// =========================================================================

module.exports = function (req, res) {

    var db = req.app.locals.db                     // Get the database reference
    var genes = db.collection('genes');            // Get the collection
    var entrezList = [];                           // List of Entrez identifiers
    var geneList = [];                             // List of gene names
    var exactMatch = cast(req.query.exactMatch)    // Match exactly the terms or not
    var orthologs = cast(req.query.orthologs)      // Return only the 1-to-1 orthologs genes
    var fields = { _id: 0 };                       // Do not keep the _id field in the results

    // Split the request terms for the database query
    if (req.query.request) {
        req.query.request
        .match(/[^\s,]+/g)
        .map(function (term) {
            return cast(term);
        })
        .forEach(function (term) {

            if (typeof(term) === 'number') {
                entrezList.push(term);
            }

            else {
                var regex = "";
                if (exactMatch) regex = new RegExp('^' + term + '$', 'i');
                else regex = new RegExp(term, 'i');
                geneList.push(regex);
            }
        });
    }

    // Build the request
    var query = { $or: [
        { EntrezId: { '$in': entrezList } },
        { Gene: { '$in': geneList } }
    ]};

    if (orthologs) {
        query.$and = [
            { "Chimpanzee.HomologyType": true },
            { "Gorilla.HomologyType": true },
            { "Marmoset.HomologyType": true },
            { "Orangutan.HomologyType": true },
            { "Macaque.HomologyType": true }
        ];
    }

    // Add the lists to the query, if any
    if (req.query.genesLists) {
        req.query.genesLists.forEach(function (name) {
            var req = {};
            req[name] = true;
            query.$or.push(req);
        });
    }

    // Send the request to the database
    genes.find(query)
        .project(fields)
        .toArray(function (err, docs) {
            if (err) {
                log.error(req.ip + ' Error during the request: ' + err.message);
                res.status(500).send(err.message);
            }
            res.status(200).send(docs.sort(alphanumSort));
        });
};
