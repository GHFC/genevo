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
// Request a bootstrap for the genes
// =========================================================================

import { mapState } from 'vuex';

// =========================================================================

const bootstrap = {
    name: 'bootstrap',
    data: function () {
        return {
            median: null,
            confidenceInterval: null
        };
    },
    computed: mapState({
        loading: state => state.loading,
        genes: state => state.genes,
        genesLists: state => state.genesLists
    }),
    watch: {
        genes: function () { this.reset(); },
        genesLists: function () { this.reset(); },
    },
    methods: {
        reset: function () {
            this.median = null;
            this.confidenceInterval = null;
        },
        getBootstrap: function () {
            if (!this.$store.state.genesRequest && !this.$store.state.genesLists.length) return;

            const params = {
                request: this.$store.state.genesRequest,
                genesLists: this.$store.state.genesLists,
                exactMatch: this.$store.state.exact,
                quality: this.$store.state.quality
            };

            this.$resources.bootstrap(params).then((response) => {
                this.median = response.data.median;
                this.confidenceInterval = response.data.confidenceInterval;
            }).catch((error) => {
                console.error(error);
            });
        }
    }
};

// =========================================================================

export default bootstrap;
