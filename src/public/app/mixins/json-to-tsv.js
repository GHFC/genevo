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
// Format the data into CSV so it can be downloaded by the user.
// =========================================================================

export default {
  methods: {
    jsonToTSV: function (json) {
      const delimiter = '\t'

      // Ensure the order of the columns
      const orderedKeys = Object.keys(json[0])

      // Write the headers
      let csv = orderedKeys.join(delimiter).concat('\n')

      // Write the data
      for (let i = 0; i < json.length; i++) {
        const row = json[i]

        for (let j = 0; j < orderedKeys.length; j++) {
          const key = orderedKeys[j]
          const value = row[key] || ''

          // The last value of each row get a new line instead of a tab
          if (j !== orderedKeys.length - 1) {
            csv = csv.concat(value, delimiter)
          } else {
            csv = csv.concat(value, '\n')
          }
        }
      }

      return csv
    }
  }
}
