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
// Box plot displaying the genes expression specificity in 4 fetal brain regions
// =========================================================================

import { mapState } from 'vuex';
import Plotly from 'plotly.js-cartesian-dist';

// =========================================================================

const fetalHumanBrain = {
    name: 'fetal-human-brain',
    data: function () {
        return {
            chart: null,
            regions: {
                R1: {
                    box: {
                        x0: null,
                        y: [],
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "y",
                        line: {
                            color: "#1F77B4",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "R1",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+y",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#1F77B4",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                R2: {
                    box: {
                        x0: null,
                        y: [],
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "y",
                        line: {
                            color: "#2CA02C",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "R2",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+y",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#2CA02C",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                R3: {
                    box: {
                        x0: null,
                        y: [],
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "y",
                        line: {
                            color: "#D62728",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "R3",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+y",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#D62728",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                R4: {
                    box: {
                        x0: null,
                        y: [],
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "y",
                        line: {
                            color: "#FF7F0E",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "R4",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+y",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#FF7F0E",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                }
            },
            data: [],
            layout: {
                xaxis: {
                    title: "Brain regions",
                    tickmode: "array",
                    tickvals: [ 0, 1, 2, 3 ],
                    ticktext: [ "R1", "R2", "R3", "R4" ]
                },
                yaxis: {
                    title: "Expression specificity",
                    range: []
                },
                showlegend: false,
                hovermode: "closest",
                margin: {
                    t: 30,
                    l: 50,
                    r: 30,
                    b: 50
                }
            },
            config: {
                showTips: false,
                displaylogo: false,
                modeBarButtonsToRemove: [
                    "sendDataToCloud",
                    "autoScale2d",
                    "hoverClosestCartesian",
                    "hoverCompareCartesian",
                    "toggleSpikelines",
                    "toImage"
                ]
            }
        };
    },
    computed: mapState({
        genes: state => state.genes,
        quality: state => state.quality,
        alleleFq: state => state.alleleFq,
        hoveredDot: state => state.hoveredDot.dot,
        selectedDots: state => state.selectedDots.dots
    }),
    watch: {
        genes: function () { this.buildChart(); },
        quality: function () { this.buildChart(); },
        alleleFq: function () { this.buildChart(); },
        hoveredDot: function (newValue, oldValue) {
            if (newValue) this.hoverDot(newValue);
            else this.unhoverDot(oldValue);
        },
        selectedDots: function (newValue) {
            if (newValue.length) this.selectDots(newValue);
            else this.deselectDots();
        }
    },
    methods: {
        clearData: function () {
            this.data = [];

            for (var region in this.regions) {
                this.regions[region].box.x0 = "";
                this.regions[region].box.y = [];

                this.regions[region].scatter.x = [];
                this.regions[region].scatter.y = [];
                this.regions[region].scatter.text = [];
            }
        },
        buildChart: function () {
            if (this.genes.length === 0) return;

            this.clearData();

            // Counter for the taxa
            let index = 0;

            // Y axis range, common to both brain graphs
            let ymax = 0;
            let ymin = 0;

            for (let region in this.regions) {
                let box = this.regions[region].box;
                let scatter = this.regions[region].scatter;

                this.genes.forEach((gene) => {

                    // Get adult and fetal values to determine the y axis range
                    let fetalExpr = gene["pre" + region + "_gn"];
                    let adultExpr = gene["pst" + region + "_gn"];

                    // Determining the y axis extremes with both values to have a common range
                    ymax = fetalExpr > ymax ? fetalExpr : ymax;
                    ymax = adultExpr > ymax ? adultExpr : ymax;

                    ymin = fetalExpr < ymin ? fetalExpr : ymin;
                    ymin = adultExpr < ymin ? adultExpr : ymin;

                    // Use the fetal value to build the graphs
                    box.x0 = index;
                    box.y.push(fetalExpr);
                    scatter.x.push(index + this.jitter() - 0.3);
                    scatter.y.push(fetalExpr);
                    scatter.text.push(gene.Gene);
                });

                this.data.push(box);
                this.data.push(scatter);

                index++;
            }

            Plotly.react('fetal-human-brain-chart', this.data, this.layout, this.config).then((chart) => {
                this.chart = chart;
                this.setEvents(chart);
            });
        },
        setEvents: function (chart) {
            const origin = this.$options.name;

            chart.on('plotly_hover', (data) => {

                // Trigger hover events only for dots
                if (data.points.length > 1) return;

                const dot = data.points[0].pointNumber;
                this.hoverDot(dot);
                this.$store.commit('setHoveredDot', { dot, origin });
            });

            chart.on('plotly_unhover', () => {
                this.$store.commit('setHoveredDot', { dot: null, origin });
            });

            chart.on('plotly_selected', (data) => {
                if (!data) return;

                const dots = data.points
                    .filter((point) => { return point.x !== false; })     // Filter the NaN points
                    .map((point) => { return point.pointNumber; })        // Get only the index
                    .filter((pointNumber, index, array) => {              // Make each index unique
                        return array.indexOf(pointNumber) === index;
                    });

                this.$store.commit('setSelectedDots', { dots, origin });
            });

            chart.on('plotly_deselect', () => {
                this.$store.commit('setSelectedDots', { dots: [], origin });
            });

            chart.on('plotly_doubleclick', () => {
                this.$store.commit('setSelectedDots', { dots: [], origin });
            });
        },
        hoverDot: function (dot) {
            const traces = [];

            for (var i = 1; i <= 7; i =i + 2) {
                traces.push({ curveNumber: i, pointNumber: dot});
            }

            Plotly.Fx.hover(this.chart, traces);
        },
        unhoverDot: function (dot) {
            const traces = [];

            for (var i = 1; i <= 7; i = i + 2) {
                traces.push({ curveNumber: i, pointNumber: dot});
            }

            Plotly.Fx.unhover(this.chart, traces);
        },
        selectDots: function (dots) {
            const opacity = [];

            this.chart.data[0].y.forEach(function (y, index) {
                if (dots.indexOf(index) > -1) opacity.push(0.8);
                else opacity.push(0.2);
            });

            Plotly.restyle(this.chart, { "marker.opacity": [opacity] }, [1, 3, 5, 7]);
        },
        deselectDots: function (dots) {
            Plotly.restyle(this.chart, { "marker.opacity": 0.8 }, [1, 3, 5, 7]);
        },
        jitter: function () {
            // Generate small noise to add a jitter to the scatter plots
            return Math.random() * (0.1) - 0.05;
        }
    }
};

// =========================================================================

export default fetalHumanBrain;
