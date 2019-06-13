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

const search = {
    name: 'search',
    data: function () {
        return {
            genes: [],
            genesInput: 'dyn',
            genesLists: '',
            exact: false,
            orthologs: false,
            quality: 'mediumQuality',
            alleleFq: 'pNpSGlobal'
        };
    },
    watch: {
        quality: function (newValue) {
            this.setQuality(newValue);
        },
        alleleFq: function (newValue) {
            this.setAlleleFq(newValue);
        }
    },
    mounted: function () {
        this.getGenes();
    },
    methods: {
        setAlleleFq: function (alleleFq) {
            this.$store.commit('setAlleleFq', alleleFq);
        },
        setQuality: function (quality) {
            this.$store.commit('setQuality', quality);
        },
        getGenes: function () {
            const params = {
                request: this.genesInput,
                exactMatch: this.exact,
                orthologs: this.orthologs,
                quality: this.quality,
                alleleFq: this.frequency
            }

            this.$resources.search(params).then((response) => {
                this.$store.commit('setGenes', response.data);
            }).catch((error) => {
                console.error(error);
            });
        },
        reset: function () {
            this.genesInput = '',
            this.exact = true,
            this.orthologs = false,
            this.quality = 'mediumQuality',
            this.frequency = 'pNpSGlobal',
            this.$store.commit('setGenes', []);
        }
    }
};

// =========================================================================

export default search;
