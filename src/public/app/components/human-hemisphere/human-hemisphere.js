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
import brainRegionsMap from '../../lib/brainBrowser-2.5.2/models/regions-vertices.json';
import { mapState } from 'vuex';
import median from '../../mixins/median';

// =========================================================================

const humanHemisphere = {
    name: 'human-hemisphere',
    mixins: [
        median
    ],
    mounted: function () {
        // Set the web workers directory
        BrainBrowser.config.set('worker_dir','lib/brainBrowser-2.5.2/workers');

        window.addEventListener('resize', () => {
            if (this.brainScene) this.renderScene();
        });
    },
    data: function () {
        return {
            brainScene: null,                       // Reference of the current scene
            brainRegionsMap: brainRegionsMap,       // List of the vertices by region
            brainRegionsValues: {},                 // Current values for each region
            regionsList: {
                bankssts: 'Banks of superior temporal sulcus',
                caudalanteriorcingulate: 'Caudal anterior cingulate',
                caudalmiddlefrontal: 'Caudal middle frontal',
                cuneus: 'Cuneus',
                entorhinal: 'Entorhinal',
                frontalpole: 'Frontal pole',
                fusiform: 'Fusiform',
                inferiorparietal: 'Inferior parietal',
                inferiortemporal: 'Inferior temporal',
                insula: 'Insula',
                isthmuscingulate: 'Isthmus of cingulate gyrus',
                lateraloccipital: 'Lateral occipital',
                lateralorbitofrontal: 'Lateral orbital',
                lingual: 'Lingual',
                medialorbitofrontal: 'Medial orbitofrontal',
                middletemporal: 'Middle temporal',
                paracentral: 'Paracentral',
                parahippocampal: 'Parahippocampal',
                parsopercularis: 'Pars opercularis',
                parsorbitalis: 'Pars orbitalis',
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
            },
            selectedRegion: '',
            mousePos: { x: null, y: null },        // The position of the mouse when the user clicks on the brain
            selectedColor: {                       // The color of the selected region
                r: 0.9,
                g: 0.9,
                b: 0.9
            },
            dataTypes: {                           // Two different set of data possible, specificity or expresssion
                specificity: {
                    fieldSuffix: '_Specificity',
                    colorMapUrl: 'lib/brainBrowser-2.5.2/colors/blue-yellow.txt',
                    colorsMapping: {
                        min: -2,
                        max: 2
                    }
                },
                expression: {
                    fieldSuffix: '_Levels',
                    colorMapUrl: 'lib/brainBrowser-2.5.2/colors/green-red.txt',
                    colorsMapping: {
                        min: -2,
                        max: 2
                    }
                }
            },
            selectedDataType: 'specificity',        // Expression by default
            mousePos: {
                x: null,
                y: null
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
        alleleFq: function () { this.buildChart(); },
        selectedDataType: function () {
            this.selectedRegion = '';
            this.buildChart();
        },
        selectedRegion: function (newRegion, oldRegion) {
            if (this.brainScene === null) return;
            if (oldRegion) this.resetRegion(oldRegion);
            if (newRegion) this.highlightRegion(newRegion);
            this.selectedRegion = newRegion;
        }
    },
    methods: {
        buildChart: function () {
            if (this.brainScene) this.purgeChart();

            BrainBrowser.SurfaceViewer.start('human-hemisphere', (viewer) => {
                this.brainScene = viewer;

                this.brainScene.addEventListener('displaymodel', () => {
                    this.brainScene.loadColorMapFromURL(this.dataTypes[this.selectedDataType].colorMapUrl);
                    this.setScene();
                });

                this.brainScene.addEventListener('loadcolormap', () => {
                    this.brainScene.loadIntensityDataFromString(this.setBrainValues(this.genes, this.selectedDataType), null, {
                        min: this.dataTypes[this.selectedDataType].colorsMapping.min,
                        max: this.dataTypes[this.selectedDataType].colorsMapping.max
                    });
                });

                // Render the scene, set the background color and load the mesh
                this.renderScene();

                this.brainScene.loadModelFromURL('lib/brainBrowser-2.5.2/models/brain-surface', {
                    format: 'freesurferbin'
                });
            });
        },
        purgeChart: function () {
            if (!this.brainScene) return;
            const brainNode = document.getElementById("human-hemisphere");
            brainNode.removeChild(brainNode.childNodes[0]);
            this.brainRegionsValues = {};
            this.brainScene = null;
        },
        renderScene: function () {
            this.brainScene.render();
            this.brainScene.setClearColor('#FFF');
        },
        setScene: function () {
            this.brainScene.setView('lateral');
            this.brainScene.zoom = 1.6;
            this.brainScene.setCameraPosition(20, 15, 0);
        },
        setBrainValues: function (genes, dataType) {

            const brainValues = [];
            const brainRegions = Object.keys(this.brainRegionsMap);

            // Calculate the median
            brainRegions.forEach((region) => {

                // Handle the unlabeled vertices
                if (region === 'unknown') {
                    this.brainRegionsValues[region] = 0;
                    return;
                }

                // Then go for the others
                const geneRegion = 'ctx-lh-' + region + this.dataTypes[dataType].fieldSuffix;
                const regionValues = [];

                genes.forEach((gene) => {
                    if (typeof(gene[geneRegion]) === 'number') {
                        regionValues.push(gene[geneRegion]);
                    }
                });

                this.brainRegionsValues[region] = this.median(regionValues);
            });

            // Set the values for all the vertices
            for (let brainRegion in this.brainRegionsMap) {
                this.brainRegionsMap[brainRegion].forEach((vertex) => {
                    brainValues[vertex] = this.brainRegionsValues[brainRegion];
                });
            }

            // Turn it into a string since brainbrowser doesn't accept arrays
            return brainValues.join('\n');
        },
        mousedown: function (event) {
            this.mousePos.x = event.screenX;
            this.mousePos.y = event.screenY;
        },
        mouseup: function (event) {
            if (this.brainScene === null) return;

            // Do nothing if the mouse moved to differentiate
            // clicking and dragging the brain.
            // This way we avoid to highlight a region when
            // the user just wanted to move the brain.
            if (this.mousePos.x !== event.screenX || this.mousePos.y !== event.screenY) return;

            // Get the vertex from the mouse position
            const vertex = this.brainScene.pick();

            // If clicked outside the brain
            if (!vertex) return;

            // Search for the region of the vertex using its index
            for (var region in this.brainRegionsMap) {
                if (this.brainRegionsMap[region].indexOf(vertex.index) > -1) {
                    if (this.selectedRegion === region) {
                        this.selectedRegion = "";
                        this.resetRegion(region);
                    }

                    else {
                        if (this.selectedRegion) this.resetRegion(this.selectedRegion);
                        this.selectedRegion = region;
                        this.highlightRegion(region);
                    }

                    return region;
                }
            }
        },
        doubleclick: function () {
            console.log('dblclick');
            if (this.brainScene === null) return;

            // Reset the scene only if double clicked ouside the brain
            if (!this.brainScene.pick()) this.setScene();
        },
        resetRegion: function (region) {
            const originalColor = this.brainScene.color_map.colorFromValue(this.brainRegionsValues[region], {
                min: this.dataTypes[this.selectedDataType].colorsMapping.min,
                max: this.dataTypes[this.selectedDataType].colorsMapping.max
            });

            // Get the colors attributes
            const colors = this.brainScene.model.getObjectByName("brain-surface_1")
                .geometry
                .attributes
                .color;

            // Set the region color
            for (let i = 0; i < this.brainRegionsMap[region].length; i++) {

                // The vertex index must be * 4 to follow the pattern of
                // the color array, which stores all RGBA codes sequentially,
                // one color in 4 indexes.
                let vertex = this.brainRegionsMap[region][i] * 4;

                colors.array[vertex] = originalColor[0];        // Red
                colors.array[vertex + 1] = originalColor[1];    // Green
                colors.array[vertex + 2] = originalColor[2];    // Blue
                colors.array[vertex + 3] = originalColor[3];    // Alpha
            }

            // Tell three.js to send the new array to the GPU
            colors.needsUpdate = true;
            this.renderScene();
        },
        highlightRegion: function (region) {

             /*
              * Here i bypass the setIntensity function in order to display
              * a color that is not in the color map.
              * I didn't find another way to do it with BrainBrowser.
              *
              */

            // Get the colors attributes
            const colors = this.brainScene.model.getObjectByName("brain-surface_1")
                .geometry
                .attributes
                .color;

            // Set the region color
            for (let i = 0; i < this.brainRegionsMap[region].length; i++) {

                // The vertex index must be * 4 to follow the pattern of
                // the color array, which stores all RGBA codes sequentially,
                // one color in 4 indexes.
                let vertex = this.brainRegionsMap[region][i] * 4;

                colors.array[vertex] = this.selectedColor.r;        // Red
                colors.array[vertex + 1] = this.selectedColor.g;    // Green
                colors.array[vertex + 2] = this.selectedColor.b;    // Blue
                colors.array[vertex + 3] = 1;                       // Alpha
            }

            // Tell three.js to send the new array to the GPU
            colors.needsUpdate = true;
            this.renderScene();
        }
    }
};

// =========================================================================

export default humanHemisphere;
