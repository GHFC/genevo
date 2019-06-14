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
// Check the content of the request
// =========================================================================

module.exports = function (req, res, next) {

    if (!req.query.request && !req.query.genesLists.length) {
        return res.status(400).send("The request cannot be empty.");
    }

    if (req.query.request) {
        if (/[$.]/.test(req.query.request)) {
            return res.status(400).send("Dollars and dots are not allowed for database safety reasons.");
        }

        if (req.query.request.length < 2) {
            return res.status(400).send("The request is too short.");
        }

        if (/(^|\s)\S(\s|$)/.test(req.query.request)) {
            return res.status(400).send("One of the terms is too short.");
        }
    }

    if (req.query.genesLists && !(req.query.genesLists instanceof Array)) {
        return res.status(400).send("The genesLists parameter must be an array.");
    }

    if (!req.query.exactMatch) {
        return res.status(400).send("The exact match parameter is missing.");
    }

    next();
};
