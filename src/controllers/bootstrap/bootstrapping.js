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
// The main function to do the bootstrap with the genes
// =========================================================================

const median = require('../../utils/median');

// =========================================================================

module.exports = function (bootstrapBoxes, population, dataField) {

    // The distribution of random medians
    let distribution = [];

    // The main bootstrap function
    function bootstrap(bootstrapBoxes, pop, dataField) {
        let dnds = [];

        // Get the dNdS of random genes
        // -------------------------------------------------------------

        for (var box in bootstrapBoxes) {

            let genesNumber = bootstrapBoxes[box];             // Number of genes with this box
            let reducedPop = pop.filter((gene) => {            // Genes in the population with this box
                return gene.BootstrapBox === parseInt(box);
            });

            // Get randomly the proper amount of genes per box
            for (var i = 0; i < genesNumber; i++) {
                let gene = pop[Math.floor(Math.random() * pop.length)];
                dnds.push(gene[dataField]);
            }
        }

        // Return the median of those dNdS
        // -------------------------------------------------------------

        return median(dnds);

    }

    // Execute the bootstrap 200 times
    for (var i = 0; i < 200; i++) {
        distribution.push(bootstrap(bootstrapBoxes, population, dataField));
    }

    // Return the sorted result
    return distribution.sort();
};
