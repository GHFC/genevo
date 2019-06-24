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
// Function to calculate the median of an array of numbers.
// =========================================================================

export default {
    methods: {
        median: function (values) {

            // Sort the values numerically first
            values.sort((a, b) => { return a - b; });

            // Get the index of the median
            const medianIndex = Math.floor(values.length / 2);

            // Get the median value
            // If odd
            if (values.length % 2) {
                return values[medianIndex];
            }

            // If even
            else {
                return (values[medianIndex - 1] + values[medianIndex]) / 2.0;
            }
        }
    }
}
