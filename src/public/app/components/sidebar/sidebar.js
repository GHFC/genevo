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
// Component handling the sidebar
// =========================================================================

import { mapState } from 'vuex';
import variantsWindow from './variantsWindow.js';

// =========================================================================

const sidebar = {
    name: 'sidebar',
    data: function () {
        return {
            filter: '',
            selectedGene: '',
            currentPage: 1,
            totalPages: 0,
            pageSize: 15
        }
    },
    computed: {
        ...mapState({
            genes: state => state.genes,
            hoveredDot: state => state.hoveredDot.dot,
            selectedDots: state => state.selectedDots.dots
        }),
        filteredGenes: function () {
            let filteredGenes = this.genes;

            // Only the selected genes, if any
            if (this.selectedDots.length) {
                filteredGenes = this.selectedDots.map((dot) => {
                    return filteredGenes[dot];
                });
            }

            // Then filter with the filter input, if any
            if (this.filter.length) {
                let filter = new RegExp(this.filter, 'ig');

                filteredGenes = filteredGenes.filter((gene) => {
                    return filter.test(gene.Gene);
                });
            };

            return filteredGenes;
        },
        paginatedGenes: function () {
            if (this.filteredGenes.length <= this.pageSize) return this.filteredGenes;

            let start = (this.currentPage - 1) * this.pageSize;
            let end = start + this.pageSize;

            return this.filteredGenes.slice(start, end);
        },
        hoveredGene: function () {
            if (typeof(this.hoveredDot) === 'number') {
                return this.genes[this.hoveredDot].Gene;
            }
        }
    },
    watch: {
        filteredGenes: function () {
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.filteredGenes.length / this.pageSize);
        }
    },
    methods: {
        selectGene: function (gene) {
            if (gene.Gene === this.selectedGene) {
                this.selectedGene = '';
            }
            else {
                this.selectedGene = gene.Gene;
            }
        },
        clipboard: function () {
            const tmp = document.createElement("textarea");
            document.body.appendChild(tmp);
            tmp.value = this.$store.getters.geneNames;
            tmp.select();
            document.execCommand("copy");
            document.body.removeChild(tmp);

            this.$notify.success({
                title: 'Copied !',
                message: 'List of genes copied to clipboard.',
                offset: 64
            });
        },
        nextPage: function () {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        },
        ncbiLink: function (id) {
            return 'https://www.ncbi.nlm.nih.gov/gene/' + id;
        },
        ensemblLink: function (id) {
            return "http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=" + id;
        },
        biogpsLink: function (id) {
            return "http://biogps.org/#goto=genereport&id="  + id;
        },
        gtexLink: function (gene) {
            return "https://www.gtexportal.org/home/gene/"  + gene;
        },
        omimLink: function (id) {
            if (id && id.length > 0) return "https://www.omim.org/entry/" + id[0];
        },
        hoverGene: function (geneName) {
            const origin = this.$options.name;
            let geneIndex = null;

            for (let i = 0; i < this.genes.length; i++) {
                if (this.genes[i].Gene === geneName) {
                    geneIndex = i;
                    break;
                }
            }

            this.$store.commit('setHoveredDot', { dot: geneIndex, origin });
        },
        showBrainGene: function (gene, dataType) {
            this.$store.commit('setBrainGene', { gene, dataType });
        },
        openVariants: function (gene) {
            if (!gene.Variants) return;

            const template = variantsWindow(gene);

            window.open(template, "", "width=900,height=580,resizeable,scrollbars")
                  .document.write(template);
        }
    }
};

// =========================================================================

export default sidebar;
