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
// Alphanumerical sort by genes for the docs before sending them to the client.
// This allows the proper sort of the genes when numbers are present.
// =========================================================================

module.exports = function (doc, nextDoc) {

    // Split each gene by groups of letters and numbers
    var gene = doc.Gene.match(/([^\d]+)|([\d]+)/g);
    var nextGene = nextDoc.Gene.match(/([^\d]+)|([\d]+)/g);

    for (var i = 0; i < gene.length; i++) {

        // If the next gene is shorter and equal so far, put it before
        if (!nextGene[i]) {
            return 1;
        }

        // Sort by numbers if letters are equal so far
        if (parseInt(gene[i])) {
            if (parseInt(gene[i]) > parseInt(nextGene[i])) return 1;
            if (parseInt(gene[i]) < parseInt(nextGene[i])) return -1;
        }

        // Sort by letters
        else {
            if (gene[i] > nextGene[i]) return 1;
            if (gene[i] < nextGene[i]) return -1;
        }
    }

    // If the current gene is shorter and equal so far, put it before
    return -1;
};
