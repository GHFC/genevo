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
// Recursive function to flatten a JSON in order to display it in a table.
// =========================================================================

export default {
    methods: {
        flattenJSON: function (entry) {
            const flatEntry = {};

            function flatten(key, value) {

                // Stop if the value is not a nested object
                if (typeof(value) !== 'object') {
                    flatEntry[key] = value;
                    return;
                }

                // Recurse when the value is a nested object and concat the keys
                for (let nestedKey in value) {
                    const nextKey = key ? key + '.' + nestedKey : nestedKey;
                    const nextValue = value[nestedKey];

                    flatten(nextKey, nextValue);
                }
            }

            // Start the recursion
            flatten('', entry);

            // Return the end result
            return flatEntry;
        }
    }
};
