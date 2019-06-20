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
// 3D left hemisphere of human brain displaying gene expression and specificty
// =========================================================================

import '../../lib/brainBrowser-2.5.2/brainbrowser.surface-viewer.min';
import { mapState } from 'vuex';

// =========================================================================

const humanHemisphere = {
    name: 'human-hemisphere',
    data: function () {
        return {
            brainScene: null,           // Reference of the current scene
            brainRegionsMap: {},        // List of the vertices by region
            brainRegionsValues: {},     // Current values for each region
            regions: {
                selected: "",
                list: {
                    bankssts: "Banks of superior temporal sulcus",
                    caudalanteriorcingulate: "Caudal anterior cingulate",
                    caudalmiddlefrontal: "Caudal middle frontal",
                    cuneus: "Cuneus",
                    entorhinal: "Entorhinal",
                    frontalpole: "Frontal pole",
                    fusiform: "Fusiform",
                    inferiorparietal: "Inferior parietal",
                    inferiortemporal: "Inferior temporal",
                    insula: "Insula",
                    isthmuscingulate: "Isthmus of cingulate gyrus",
                    lateraloccipital: "Lateral occipital",
                    lateralorbitofrontal: "Lateral orbital",
                    lingual: "Lingual",
                    medialorbitofrontal: "Medial orbitofrontal",
                    middletemporal: "Middle temporal",
                    paracentral: "Paracentral",
                    parahippocampal: "Parahippocampal",
                    parsopercularis: "Pars opercularis",
                    parsorbitalis: "Pars orbitalis",
                    parstriangularis: "Pars triangularis",
                    pericalcarine: "Pericalcarine",
                    postcentral: "Postcentral",
                    posteriorcingulate: "Posterior cingulate",
                    precentral: "Precentral",
                    precuneus: "Precuneus",
                    rostralanteriorcingulate: "Rostral anterior cingulate",
                    rostralmiddlefrontal: "Rostral middle frontal",
                    superiorfrontal: "Superior frontal",
                    superiorparietal: "Superior parietal",
                    superiortemporal: "Superior temporal",
                    supramarginal: "Supramarginal",
                    temporalpole: "Temporal pole",
                    transversetemporal: "Tranverse temporal",
                    unknown: "Unknown"
                }
            },
            mousePos: { x: null, y: null },        // The position of the mouse when the user clicks on the brain
            selectedColor: {                       // The color of the selected region
                r: 0.9,
                g: 0.9,
                b: 0.9
            },
            dataTypes: {                           // Two different set of data possible, specificity or expresssion
                current: 'expression',             // Expression by default
                specificity: {
                    fieldSuffix: "_Specificity",
                    colorMapUrl: "lib/brainBrowser-2.5.2/colors/blue-yellow.txt",
                    colorsMapping: {
                        min: -2,
                        max: 2
                    }
                },
                expression: {
                    fieldSuffix: "_Levels",
                    colorMapUrl: "lib/brainBrowser-2.5.2/colors/green-red.txt",
                    colorsMapping: {
                        min: -2,
                        max: 2
                    }
                }
            }
        }
    },
    computed: mapState({
        genes: state => state.genes,
        quality: state => state.quality,
        alleleFq: state => state.alleleFq
    }),
    watch: {
        genes: function () { this.buildChart(); },
        quality: function () { this.buildChart(); },
        alleleFq: function () { this.buildChart(); }
    },
    methods: {
        buildChart: function () {
            BrainBrowser.config.set('worker_dir','lib/brainBrowser-2.5.2/workers');

            BrainBrowser.SurfaceViewer.start("human-hemisphere", (viewer) => {
                this.brainScene = viewer;

                this.brainScene.addEventListener("displaymodel", () => {
                    this.brainScene.loadColorMapFromURL(this.dataTypes[this.dataTypes.current].colorMapUrl);
                    this.setScene();
                });

                // this.brainScene.addEventListener("loadcolormap", () => {
                //     this.brainScene.loadIntensityDataFromString(setBrainValues(genes, dataType), null, {
                //         min: this.dataTypes[this.dataTypes.current].colorsMapping.min,
                //         max: this.dataTypes[this.dataTypes.current].colorsMapping.max
                //     });
                // });

                // Render the scene, set the background color and load the mesh
                this.renderScene();

                this.brainScene.loadModelFromURL('lib/brainBrowser-2.5.2/models/brain-surface', {
                    format: "freesurferbin"
                });
            });
        },
        renderScene: function () {
            this.brainScene.render();
            this.brainScene.setClearColor("#FFF");
        },
        setScene: function () {
            this.brainScene.setView("lateral");
            this.brainScene.zoom = 1.6;
            this.brainScene.setCameraPosition(20, 15, 0);
        },
        // getBrainRegionsMap: function () {
        //     this.$resource
        // }
    }
};

// =========================================================================

export default humanHemisphere;
