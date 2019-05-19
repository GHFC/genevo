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

const sidebar = {
    name: 'sidebar',
    data: function () {
        return {
            filter: '',
            selectedGene: '',
            hoverGene: '',
            currentPage: 1,
            totalPages: 0,
            pageSize: 15
        }
    },
    computed: {
        genes: function () {
            return this.$store.getters.genes;
        },
        filteredGenes: function () {
            if (!this.filter.length) return this.genes;

            let filter = new RegExp(this.filter, 'ig');

            return this.genes.filter((gene) => {
                return filter.test(gene.Gene);
            });
        },
        paginatedGenes: function () {
            if (this.filteredGenes.length <= this.pageSize) return this.filteredGenes;

            let start = (this.currentPage - 1) * this.pageSize;
            let end = start + this.pageSize;

            return this.filteredGenes.slice(start, end);
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
        }
    }
};

// =========================================================================

export default sidebar;
