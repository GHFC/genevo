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
// Scatter plot displaying the dN and dS of the primate's taxons
// =========================================================================

import Plotly from 'plotly.js-cartesian-dist';

// =========================================================================

const primateEvolution = {
    name: 'primate-evolution',
    data: function () {
        return {
            data: [
                {
                    name: "Homo sapiens",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Altaï",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Denisovan",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Pan troglodytes",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Macaca mulatta",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Pongo abelii",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Gorilla gorilla",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                },
                {
                    name: "Callithrix jacchus",
                    x: [],
                    y: [],
                    text: [],
                    type: "scatter",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: {
                        size: 8,
                        opacity: 0.8,
                        symbol: "circle",
                        line: {
                            width: 1
                        }
                    }
                }
            ],
            layout: {
                xaxis: {
                    title: "dS",
                    rangemode: "nonnegative"
                },
                yaxis: {
                    title: "dN",
                    rangemode: "nonnegative"
                },
                hovermode: "closest",
                margin: {
                    t: 30,
                    l: 50,
                    b: 50
                },
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
            },
            species: {
                // Translator for the database keys
                "Homo sapiens": "HS",
                "Altaï": "altai",
                "Denisovan": "denisovan",
                "Sidrón": "sidron",
                "Vindija": "vindija",
                "Pan troglodytes": "pantro",
                "Macaca mulatta": "rheMac3",
                "Pongo abelii": "ponAbe2",
                "Gorilla gorilla": "gorGor3",
                "Callithrix jacchus": "calJac3"
            }
        };
    },
    computed: {
        genes: function () {
            return this.$store.getters.genes;
        },
        quality: function () {
            return this.$store.getters.quality;
        },
        alleleFq: function () {
            return this.$store.getters.alleleFq;
        }
    },
    watch: {
        genes: function () {
            this.buildGraph();
        },
        quality: function () {
            this.buildGraph();
        },
        alleleFq: function () {
            this.buildGraph();
        }
    },
    methods: {
        clearData: function () {
            this.data.forEach((trace, index) => {
                this.data[index].x = [];
                this.data[index].y = [];
                this.data[index].text = [];
            });
        },
        buildGraph: function () {
            this.clearData();

            this.data.forEach((trace, index) => {
                const sp = this.species[trace.name];

                this.genes.forEach((gene) => {
                    let dN = "";
                    let dS = "";

                    if (!gene[this.quality]) {
                        dN = NaN;
                        dS = NaN;
                    }
                    else {
                        dN = gene[this.quality].AN[sp].dN;
                        dS = gene[this.quality].AN[sp].dS;

                        if (typeof(dN) !== "number" || typeof(dS) !== "number") {
                            dN = NaN;
                            dS = NaN;
                        }
                    }

                    this.data[index].x.push(dS);
                    this.data[index].y.push(dN);
                    this.data[index].text.push(gene.Gene);
                });
            });

            Plotly.react('primate-evolution-chart', this.data, this.layout, this.config);
        }
    }
};

// =========================================================================

export default primateEvolution;
