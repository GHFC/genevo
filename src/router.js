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
// Main router
// =========================================================================

const express = require('express');
const requestChecker = require('./controllers/requestChecker');
const bootstrap = require('./controllers/bootstrap');
const search = require('./controllers/search');
const logger = require('./middlewares/log.js');

const router = express.Router();

// Middlewares
// =========================================================================

router.use(logger);

// Routes
// =========================================================================

// Request the database and return the genes
router.get('/search', [
    requestChecker,
    search
]);

// Run a bootstrap for the requested genes
router.get('/bootstrap', [
    requestChecker,
    bootstrap
]);

// =========================================================================

module.exports = router;
