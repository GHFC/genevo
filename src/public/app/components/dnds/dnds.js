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
// Box plot displaying the dN/dS by taxon
// =========================================================================

import { mapState } from 'vuex';
import Plotly from 'plotly.js-cartesian-dist';
import '../../images/phylotree.png';

// =========================================================================

const dnds = {
    name: 'dnds',
    data: function () {
        return {
            chart: null,
            taxa: {
                "Homo sapiens": {
                    key: "HS",                      // Translator for the database key
                    box: {                          // Data for the box plot
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#1F77B4",
                            width: 1
                        }
                    },
                    scatter: {                      // Data for the scatter plot
                        name: "Homo sapiens",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
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
                "Altaï": {
                    key: "altai",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#FF7F0E",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Altaï",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
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
                },
                "Denisovan": {
                    key: "denisovan",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#2CA02C",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Denisovan",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
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
                "Pan troglodytes": {
                    key: "pantro",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#D62728",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Pan troglodytes",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
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
                "Gorilla gorilla": {
                    key: "gorGor3",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#E377C2",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Gorilla gorilla",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#E377C2",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                "Pongo abelii": {
                    key: "ponAbe2",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#8C564B",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Pongo abelii",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#8C564B",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                "Macaca mulatta": {
                    key: "rheMac3",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#946BC7",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Macaca mulatta",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#946BC7",
                            symbol: "circle",
                            line: {
                                width: 1
                            }
                        }
                    }
                },
                "Callithrix jacchus": {
                    key: "calJac3",
                    box: {
                        x: [],
                        y0: "",
                        type: "box",
                        boxpoints: false,
                        boxmean: true,
                        hoverinfo: "x",
                        line: {
                            color: "#7F7F7F",
                            width: 1
                        }
                    },
                    scatter: {
                        name: "Callithrix jacchus",
                        x: [],
                        y: [],
                        text: [],
                        hoverinfo: "text+x",
                        type: "scatter",
                        mode: "markers",
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: "#7F7F7F",
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
                yaxis: {
                    range: [ 7.5, -0.5 ],
                    tickmode: "array",
                    tickvals: [ 0, 1, 2, 3, 4, 5, 6, 7 ],
                    ticktext: [
                        "Homo sapiens",
                        "Altaï",
                        "Denisovan",
                        "Pan troglodytes",
                        "Gorilla gorilla",
                        "Pongo abelii",
                        "Macaca mulatta",
                        "Callithrix jacchus"
                    ]
                },
                showlegend: false,
                hovermode: "closest",
                margin: {
                    t: 30,
                    l: 250,
                    r: 30,
                    b: 50
                },
                images: [
                    {
                        source: "images/phylotree.png",
                        yref: "y",
                        xref: "paper",
                        y: 0,
                        x: -0.08,
                        sizey: 7,
                        sizex: 10,
                        xanchor: "right"
                    }
                ]
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

            for (var taxon in this.taxa) {
                this.taxa[taxon].box.x = [];
                this.taxa[taxon].box.y0 = "";

                this.taxa[taxon].scatter.x = [];
                this.taxa[taxon].scatter.y = [];
                this.taxa[taxon].scatter.text = [];
            }
        },
        buildChart: function () {
            this.clearData();

            // Counter for the taxa
            let index = 0;

            // Process the raw data
            for (let taxon in this.taxa) {
                const key = this.taxa[taxon].key;
                const box = this.taxa[taxon].box;
                const scatter = this.taxa[taxon].scatter;

                this.genes.forEach((gene) => {
                    let dNdS = "";

                    if (!gene[this.quality]) {
                        dNdS = NaN;
                    }
                    else {
                        dNdS = gene[this.quality].AN[key].OmegaHuguet;

                        if (typeof(dNdS) !== "number") {
                            dNdS = NaN;
                        }
                    }

                    box.x.push(dNdS);
                    box.y0 = index;
                    scatter.x.push(dNdS);
                    scatter.y.push(index + this.jitter() + 0.3);
                    scatter.text.push(gene.Gene);
                });

                this.data.push(box);
                this.data.push(scatter);

                index++;
            }

            Plotly.react('dnds-chart', this.data, this.layout, this.config).then((chart) => {
                this.chart = chart;
                this.setEvents(chart);
            });
        },
        setEvents: function (chart) {
            const origin = this.$options.name;

            chart.on('plotly_hover', (data) => {
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

            for (var i = 1; i <= 15; i =i + 2) {
                traces.push({ curveNumber: i, pointNumber: dot});
            }

            Plotly.Fx.hover(this.chart, traces);
        },
        unhoverDot: function (dot) {
            const traces = [];

            for (var i = 1; i <= 15; i = i + 2) {
                traces.push({ curveNumber: i, pointNumber: dot});
            }

            Plotly.Fx.unhover(this.chart, traces);
        },
        selectDots: function (dots) {
            const opacity = [];

            this.chart.data[0].x.forEach(function (y, index) {
                if (dots.indexOf(index) > -1) opacity.push(0.8);
                else opacity.push(0.2);
            });

            Plotly.restyle(this.chart, { "marker.opacity": [opacity] }, [1, 3, 5, 7, 9, 11, 13, 15]);
        },
        deselectDots: function (dots) {
            Plotly.restyle(this.chart, { "marker.opacity": 0.8 }, [1, 3, 5, 7, 9, 11, 13, 15]);
        },
        jitter: function () {
            return Math.random() * (0.1) - 0.05;
        }
    }
};

// =========================================================================

export default dnds;
