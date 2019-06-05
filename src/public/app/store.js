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
// Vuex store for managing the application's states
// =========================================================================

import Vue from 'vue';
import Vuex from 'vuex';

// =========================================================================

Vue.use(Vuex);

// =========================================================================

const store = new Vuex.Store({
    state: {
        loading: false,
        genes: [],
        quality: 'mediumQuality',
        alleleFq: 'pNpSGlobal'
    },
    mutations: {
        addRequest: function (state) {
            state.loading = true;
        },
        removeRequest: function (state) {
            state.loading = false;
        },
        setGenes: function (state, genes) {
            state.genes = genes;
        },
        setAlleleFq: function (state, alleleFq) {
            state.alleleFq = alleleFq;
        },
        setQuality: function (state, quality) {
            state.quality = quality;
        }
    },
    getters: {
        genes: function (state) {
            return state.genes;
        },
        geneNames: function (state) {
            return state.genes.map((gene) => {
                return gene.Gene;
            });
        },
        alleleFq: function (state) {
            return state.alleleFq;
        },
        quality: function (state) {
            return state.quality;
        }
    }
});

// =========================================================================

export default store;
