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
// Scatter plot displaying the dN/dS and pN/pS of the modern humans
// =========================================================================

import Plotly from 'plotly.js-cartesian-dist';

// =========================================================================

const modernHumans = {
    name: 'modern-humans',
    data: function () {
        return {
            data: {
                x: [],
                y: [],
                text: [],
                type: "scatter",
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
            layout: {
                xaxis: {
                    title: "pN/pS",
                    rangemode: "nonnegative"
                },
                yaxis: {
                    title: "dN/dS",
                    rangemode: "nonnegative"
                },
                hovermode: "closest",
                margin: {
                    t: 30,
                    l: 50,
                    b: 50
                },
                shapes: [
                    {
                        // Median of the dNdS axis
                        type: "line",
                        xref: "paper",
                        yref: "y",
                        x0: 0,
                        y0: null,
                        x1: 1,
                        y1: null,
                        layer: "below",
                        opacity: 0.8,
                        line: {
                            color: "#5A94BC",
                            width: 3,
                            dash: "dot"
                        }
                    },
                    {
                        // Median of the pNpS axis
                        type: "line",
                        xref: "x",
                        yref: "paper",
                        x0: null,
                        y0: 0,
                        x1: null,
                        y1: 1,
                        layer: "below",
                        opacity: 0.8,
                        line: {
                            color: "#5A94BC",
                            width: 3,
                            dash: "dot"
                        }
                    },
                    {
                        // Mean of the dNdS axis
                        type: "line",
                        xref: "paper",
                        yref: "y",
                        x0: 0,
                        y0: null,
                        x1: 1,
                        y1: null,
                        layer: "below",
                        opacity: 1,
                        line: {
                            color: "#A5A5A5",
                            width: 3
                        }
                    },
                    {
                        // Mean of the pNpS axis
                        type: "line",
                        xref: "x",
                        yref: "paper",
                        x0: null,
                        y0: 0,
                        x1: null,
                        y1: 1,
                        layer: "below",
                        opacity: 1,
                        line: {
                            color: "#A5A5A5",
                            width: 3
                        }
                    },
                    {
                        // Standard deviation of the dNdS axis
                        type: "rect",
                        xref: "paper",
                        yref: "y",
                        x0: 0,
                        y0: null,
                        x1: 1,
                        y1: null,
                        layer: "below",
                        opacity: 0.08,
                        fillcolor: "#A5A5A5",
                        line: {
                            color: "#A5A5A5",
                            width: 1
                        }
                    },
                    {
                        // Standard deviation * 2 of the dNdS axis
                        type: "rect",
                        xref: "paper",
                        yref: "y",
                        x0: 0,
                        y0: null,
                        x1: 1,
                        y1: null,
                        layer: "below",
                        opacity: 0.08,
                        fillcolor: "#A5A5A5",
                        line: {
                            color: "#A5A5A5",
                            width: 1
                        }
                    },
                    {
                        // Standard deviation of the pNpS axis
                        type: "rect",
                        xref: "x",
                        yref: "paper",
                        x0: null,
                        y0: 0,
                        x1: null,
                        y1: 1,
                        layer: "below",
                        opacity: 0.08,
                        fillcolor: "#A5A5A5",
                        line: {
                            color: "#A5A5A5",
                            width: 1
                        }
                    },
                    {
                        // Standard deviation * 2 of the pNpS axis
                        type: "rect",
                        xref: "x",
                        yref: "paper",
                        x0: null,
                        y0: 0,
                        x1: null,
                        y1: 1,
                        layer: "below",
                        opacity: 0.08,
                        fillcolor: "#A5A5A5",
                        line: {
                            color: "#A5A5A5",
                            width: 1
                        }
                    }
                ],
                annotations:[
                    {
                        // Median label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        showarrow: false,
                        text: "median"
                    },
                    {
                        // Mean label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        showarrow: false,
                        text: "mean"
                    },
                    {
                        // Standard deviation of the dNdS axis (lower limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation of the dNdS axis (upper limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation * 2 of the dNdS axis (lower limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation * 2 of the dNdS axis (upper limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation of the pNpS axis (lower limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation of the pNpS axis (upper limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation * 2 of the pNpS axis (lower limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation * 2 of the pNpS axis (upper limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation 1𝜎 lower label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        text: "1𝜎",
                        showarrow: false
                    },
                    {
                        // Standard deviation 1𝜎 upper label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        text: "1𝜎",
                        showarrow: false
                    },
                    {
                        // Standard deviation 2𝜎 lower label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        text: "2𝜎",
                        showarrow: false
                    },
                    {
                        // Standard deviation 2𝜎 upper label
                        xref: "paper",
                        yref: "y",
                        x: 1.01,
                        y: null,
                        xanchor: "left",
                        text: "2𝜎",
                        showarrow: false
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
            },
            dnds: {
                lowQuality: {
                    mean: 0.375090094727,
                    median: 0.304545,
                    std: 0.392861381658
                },
                mediumQuality: {
                    mean: 0.376626422738,
                    median: 0.310387932586,
                    std: 0.393455038205
                },
                highQuality: {
                    mean: 0.375868072611,
                    median: 0.312885186071,
                    std: 0.385507698019
                }
            },
            pnps: {
                pNpS001: {
                    mean: 0.725919063434,
                    median: 0.645567554229,
                    std: 0.49659184453
                },
                pNpS005: {
                    mean: 0.701196850631,
                    median: 0.625850498678,
                    std: 0.481821451345
                },
                pNpSGlobal: {
                    mean: 0.699228233365,
                    median: 0.626100518187,
                    std: 0.512379041255
                }
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
            this.data.x = [];
            this.data.y = [];
            this.data.text = [];
        },
        buildGraph: function () {
            this.clearData();
            this.setLayout();

            this.genes.forEach((gene) => {
                this.data.text.push(gene.Gene);

                // If one data is missing, put the gene in the missing data list
                if (!gene[this.alleleFq] || !gene[this.quality]) {
                    this.data.x.push(NaN);
                    this.data.y.push(NaN);
                    // graph.missingValues.push(gene.Gene);
                    return;
                }

                // Get and calculate both parameters
                let dNdS = gene[this.quality].AN.HS.OmegaHuguet;
                let pNpS = gene[this.alleleFq];

                // Set explicitly the parameters to NaN if needed
                if (typeof(dNdS) !== "number") dNdS = NaN;
                if (typeof(pNpS) !== "number") pNpS = NaN;

                // Add the results to the list
                this.data.x.push(pNpS);
                this.data.y.push(dNdS);

                // if (isNaN(dNdS) || isNaN(pNpS)) graph.missingValues.push(gene.Gene);
            });

            Plotly.react('modern-humans-chart', [this.data], this.layout, this.config);
        },
        setLayout: function () {

            // Median of the dNdS axis
            this.layout.shapes[0].y0 = this.dnds[this.quality].median;
            this.layout.shapes[0].y1 = this.dnds[this.quality].median;

            // Label
            this.layout.annotations[0].y = this.dnds[this.quality].median;

            // Median of the pNpS axis
            this.layout.shapes[1].x0 = this.pnps[this.alleleFq].median;
            this.layout.shapes[1].x1 = this.pnps[this.alleleFq].median;

            // Mean of the dNdS axis
            this.layout.shapes[2].y0 = this.dnds[this.quality].mean;
            this.layout.shapes[2].y1 = this.dnds[this.quality].mean;

            // Label
            this.layout.annotations[1].y = this.dnds[this.quality].mean;

            // Mean of the pNpS axis
            this.layout.shapes[3].x0 = this.pnps[this.alleleFq].mean;
            this.layout.shapes[3].x1 = this.pnps[this.alleleFq].mean;

            // Standard deviation of the dNdS axis
            const dNdSstdLower = this.dnds[this.quality].mean - this.dnds[this.quality].std;
            const dNdSstdUpper = this.dnds[this.quality].mean + this.dnds[this.quality].std;

            this.layout.shapes[4].y0 = dNdSstdLower;
            this.layout.shapes[4].y1 = dNdSstdUpper;

            this.layout.annotations[2].y = dNdSstdLower;
            this.layout.annotations[2].text = String(dNdSstdLower.toFixed(2));
            this.layout.annotations[3].y = dNdSstdUpper;
            this.layout.annotations[3].text = String(dNdSstdUpper.toFixed(2));

            // Labels
            this.layout.annotations[10].y = dNdSstdLower;
            this.layout.annotations[11].y = dNdSstdUpper;

            // Standard deviation * 2 of the dNdS axis
            const dNdSstdLowerx2 = this.dnds[this.quality].mean - this.dnds[this.quality].std * 2;
            const dNdSstdUpperx2 = this.dnds[this.quality].mean + this.dnds[this.quality].std * 2;

            this.layout.shapes[5].y0 = dNdSstdLowerx2;
            this.layout.shapes[5].y1 = dNdSstdUpperx2;

            this.layout.annotations[4].y = dNdSstdLowerx2;
            this.layout.annotations[4].text = String(dNdSstdLowerx2.toFixed(2));
            this.layout.annotations[5].y = dNdSstdUpperx2;
            this.layout.annotations[5].text = String(dNdSstdUpperx2.toFixed(2));

            // Labels
            this.layout.annotations[12].y = dNdSstdLowerx2;
            this.layout.annotations[13].y = dNdSstdUpperx2;

            // Standard deviation of the pNpS axis
            const pNpSstdLower = this.pnps[this.alleleFq].mean - this.pnps[this.alleleFq].std;
            const pNpSstdUpper = this.pnps[this.alleleFq].mean + this.pnps[this.alleleFq].std;

            this.layout.shapes[6].x0 = pNpSstdLower;
            this.layout.shapes[6].x1 = pNpSstdUpper;

            this.layout.annotations[6].x = pNpSstdLower;
            this.layout.annotations[6].text = String(pNpSstdLower.toFixed(2));
            this.layout.annotations[7].x = pNpSstdUpper;
            this.layout.annotations[7].text = String(pNpSstdUpper.toFixed(2));

            // Standard deviation * 2 of the pNpS axis
            const pNpSstdLowerx2 = this.pnps[this.alleleFq].mean - this.pnps[this.alleleFq].std * 2;
            const pNpSstdUpperx2 = this.pnps[this.alleleFq].mean + this.pnps[this.alleleFq].std * 2;

            this.layout.shapes[7].x0 = pNpSstdLowerx2;
            this.layout.shapes[7].x1 = pNpSstdUpperx2;

            this.layout.annotations[8].x = pNpSstdLowerx2;
            this.layout.annotations[8].text = String(pNpSstdLowerx2.toFixed(2));
            this.layout.annotations[9].x = pNpSstdUpperx2;
            this.layout.annotations[9].text = String(pNpSstdUpperx2.toFixed(2));
        }
    }
};

// =========================================================================

export default modernHumans;
