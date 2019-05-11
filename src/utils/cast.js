// The Neanderthal project website
// Copyright (C) 2017 Institut Pasteur
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
// Function to cast properly a single string.
// Dates ares not handled, only strings, integers, floats and booleans.
// =========================================================================

// Regular expressions for the different numbers, allowing exponents
var integer = /^[+-]?\d+(?:[eE][+-]?\d+)?$/;
var decimal = /^[+-]?\d+\.\d+(?:[eE][+-]?\d+)?$/;

module.exports = function (string) {

    // Only parseFloat can handle exponents
    if (integer.test(string) || decimal.test(string)) {
        return parseFloat(string.toLowerCase());
    }

    if (string.toLowerCase() === "true") {
        return true;
    }

    if (string.toLowerCase() === "false") {
        return false;
    }

    return string;
};
