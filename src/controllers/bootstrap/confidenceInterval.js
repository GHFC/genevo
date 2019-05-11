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
// Get the confidence interval limits for a distribution
// =========================================================================

module.exports = function (distribution) {
    let high = distribution[Math.round((1 - 0.025) * distribution.length)];
    let low = distribution[Math.round(0.025 * distribution.length)];

    return {
        high: high.toFixed(5),
        low: low.toFixed(5)
    };
};
