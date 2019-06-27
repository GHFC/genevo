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
// Vuex store for managing the application state
// =========================================================================

import Vue from 'vue';
import Vuex from 'vuex';

// =========================================================================

Vue.use(Vuex);

// =========================================================================

const store = new Vuex.Store({
    state: {
        loading: false,                 // Marker to know when a request is pending
        genes: [],                      // List of genes found by the request
        genesRequest: '',               // Text request sent to the server
        genesList: [],                  // Lists of genes sent to the server
        exact: true,                    // Exact match parameter
        quality: 'mediumQuality',       // Coverage quality parameter
        alleleFq: 'pNpSGlobal',         // Allele frequency parameter
        hoveredDot: {                   // The dot of a chart currently hovered by the mouse
            dot: null,
            origin: ''                  // The chart where is was triggered
        },
        selectedDots: {                 // The list of dots currently selected by the user
            dots:  [],
            origin: ''                  // The chart where is was triggered
        },
        brainGene: {                    // The gene selected in the sidebar to be displayed in the 3D brain
            gene: null,
            dataType: ''
        }
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
        setGenesRequest: function (state, request) {
            state.genesRequest = request;
        },
        setGenesList: function (state, list) {
            state.genesList = list;
        },
        setExact: function (state, exact) {
            state.exact = exact;
        },
        setAlleleFq: function (state, alleleFq) {
            state.alleleFq = alleleFq;
        },
        setQuality: function (state, quality) {
            state.quality = quality;
        },
        setHoveredDot: function (state, data) {
            state.hoveredDot.dot = data.dot;
            state.hoveredDot.origin = data.origin;
        },
        setSelectedDots: function (state, data) {
            state.selectedDots.dots = data.dots;
            state.selectedDots.origin = data.origin;
        },
        setBrainGene: function (state, data) {
            state.brainGene.gene = data.gene;
            state.brainGene.dataType = data.dataType;
        }
    },
    getters: {
        geneNames: function (state) {
            return state.genes.map((gene) => {
                return gene.Gene;
            });
        }
    }
});

// =========================================================================

export default store;
