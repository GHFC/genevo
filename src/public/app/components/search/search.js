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
// Main form for requesting the data
// =========================================================================

import presetLists from './gene-lists.js';
import rawColumns from './raw-columns.js';
import flattenJSON from '../../mixins/flatten-json.js';
import jsonToTSV from '../../mixins/json-to-tsv.js';

// =========================================================================

const search = {
    name: 'search',
    mixins: [
        flattenJSON,
        jsonToTSV
    ],
    data: function () {
        return {
            genesInput: '',
            genesLists: [],
            presetLists: presetLists,
            exact: true,
            orthologs: false,
            quality: 'mediumQuality',
            alleleFq: 'pNpSGlobal',
            rawColumns: rawColumns,
        };
    },
    computed: {
        genes: function () {
            return this.$store.state.genes;
        },
        loading: function () {
            return this.$store.state.loading;
        }
    },
    watch: {
        genesInput: function (newValue) {
            this.$store.commit('setGenesRequest', newValue);
        },
        genesLists: function (newValue) {
            this.$store.commit('setGenesLists', newValue);
        },
        exact: function (newValue) {
            this.$store.commit('setExact', newValue);
        },
        quality: function (newValue) {
            this.$store.commit('setQuality', newValue);
        },
        alleleFq: function (newValue) {
            this.$store.commit('setAlleleFq', newValue);
        }
    },
    mounted: function () {
        this.getGenes();
    },
    methods: {
        getGenes: function () {
            if (!this.genesInput && !this.genesLists.length) return;

            const params = {
                request: this.genesInput,
                genesLists: this.genesLists,
                exactMatch: this.exact,
                orthologs: this.orthologs,
                quality: this.quality,
                alleleFq: this.frequency
            }

            this.$resources.search(params).then((response) => {
                this.$store.commit('setGenes', response.data);

                if (!response.data.length) this.$store.commit('setNoResults', true);
                else this.$store.commit('setNoResults', false);
            }).catch((error) => {
                console.error(error);
            });
        },
        reset: function () {
            this.genesInput = '',
            this.genesLists = [],
            this.exact = true,
            this.orthologs = false,
            this.quality = 'mediumQuality',
            this.frequency = 'pNpSGlobal',
            this.$store.commit('setGenes', []);
            this.$store.commit('setNoResults', false);
        },
        downloadGenes: function () {

            // Flatten the raw data
            const flatData = this.genes.map(this.flattenJSON);

            // Build the table and set the URI for the download
            const filteredData = flatData.map((entry) => {
                const filteredEntry = {};

                for (let key in this.rawColumns) {
                    const column = this.rawColumns[key];
                    filteredEntry[column] = entry[key];
                }

                return filteredEntry;
            });

            // Generate the file in memory
            const data = this.jsonToTSV(filteredData);
            const file = new Blob([ data ], { type: 'text/tab-separated-values' });
            const fileURL = window.URL.createObjectURL(file);
            const date = new Date().toISOString().replace(/T.*/, '');

            // Download the file
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'neanderthal_' + date + '.tsv';

            // Explicity append the link to body for Firefox
            document.body.appendChild(link);

            link.click();
            link.remove();
        }
    }
};

// =========================================================================

export default search;
