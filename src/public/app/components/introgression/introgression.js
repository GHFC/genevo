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
// Scatter plot displaying the Neanderthal introgression
// =========================================================================

import Plotly from 'plotly.js-cartesian-dist';

// =========================================================================

const introgression = {
    name: 'introgression',
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
                    color: "#2CA02C",
                    symbol: "circle",
                    line: {
                        width: 1
                    }
                }
            },
            layout: {
                xaxis: {
                    title: "CCDS Europe"
                },
                yaxis: {
                    title: "CCDS Asia"
                },
                hovermode: "closest",
                margin: {
                    t: 30,
                    l: 50,
                    b: 50
                },
                shapes: [
                    {
                        // Median of the Asia axis
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
                        // Median of the Europe axis
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
                        // Mean of the Asia axis
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
                        // Mean of the Europe axis
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
                        // Standard deviation of the Asia axis
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
                        // Standard deviation * 2 of the Asia axis
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
                        // Standard deviation of the Europe axis
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
                        // Standard deviation * 2 of the Europe axis
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
                annotations: [
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
                        // Standard deviation of the Asia axis (lower limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation of the Asia axis (upper limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation * 2 of the Asia axis (lower limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation * 2 of the Asia axis (upper limit)
                        xref: "paper",
                        yref: "y",
                        x: 1,
                        y: null,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation of the Europe axis (lower limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation of the Europe axis (upper limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Upper limit of the standard deviation 1𝜎"
                    },
                    {
                        // Standard deviation * 2 of the Europe axis (lower limit)
                        xref: "x",
                        yref: "paper",
                        x: null,
                        y: 1,
                        text: "",
                        showarrow: false,
                        hovertext: "Lower limit of the standard deviation 2𝜎"
                    },
                    {
                        // Standard deviation * 2 of the Europe axis (upper limit)
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
            ccdsEurope: {
                std: 0.032701170809785234,
                median: 0.0068333333333299995,
                mean: 0.019184544959307527
            },
            ccdsAsia: {
                std: 0.043938849102727946,
                median: 0.006999999999999999,
                mean: 0.022660538533982904
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
            this.buildChart();
        },
        quality: function () {
            this.buildChart();
        },
        alleleFq: function () {
            this.buildChart();
        }
    },
    methods: {
        clearData: function () {
            this.data.x = [];
            this.data.y = [];
            this.data.text = [];
        },
        buildChart: function () {
            this.clearData();
            this.setLayout();

            this.genes.forEach((gene) => {
                this.data.text.push(gene.Gene);

                // Get both parameters
                const CCDS_Europe = gene.CCDS_PEUR;
                const CCDS_Asia = gene.CCDS_PASN;

                if (typeof(CCDS_Europe) !== "number" || typeof(CCDS_Asia) !== "number") {
                    this.data.x.push(NaN);
                    this.data.y.push(NaN);
                    return;
                }

                // Add the results to the list
                this.data.x.push(CCDS_Europe);
                this.data.y.push(CCDS_Asia);
            });

            Plotly.react('introgression-chart', [this.data], this.layout, this.config);
        },
        setLayout: function () {

            // Median of the Asia axis
            this.layout.shapes[0].y0 = this.ccdsAsia.median;
            this.layout.shapes[0].y1 = this.ccdsAsia.median;

            // Label
            this.layout.annotations[0].y = this.ccdsAsia.median;

            // Median of the Europe axis
            this.layout.shapes[1].x0 = this.ccdsEurope.median;
            this.layout.shapes[1].x1 = this.ccdsEurope.median;

            // Mean of the Asia axis
            this.layout.shapes[2].y0 = this.ccdsAsia.mean;
            this.layout.shapes[2].y1 = this.ccdsAsia.mean;

            // Label
            this.layout.annotations[1].y = this.ccdsAsia.mean;

            // Mean of the Europe axis
            this.layout.shapes[3].x0 = this.ccdsEurope.mean;
            this.layout.shapes[3].x1 = this.ccdsEurope.mean;

            // Standard deviation of the Asia axis
            var asiaStdLower = this.ccdsAsia.mean - this.ccdsAsia.std;
            var asiaStdUpper = this.ccdsAsia.mean + this.ccdsAsia.std;

            this.layout.shapes[4].y0 = asiaStdLower;
            this.layout.shapes[4].y1 = asiaStdUpper;

            this.layout.annotations[2].y = asiaStdLower;
            this.layout.annotations[2].text = String(asiaStdLower.toFixed(2));
            this.layout.annotations[3].y = asiaStdUpper;
            this.layout.annotations[3].text = String(asiaStdUpper.toFixed(2));

            // Labels
            this.layout.annotations[10].y = asiaStdLower;
            this.layout.annotations[11].y = asiaStdUpper;

            // Standard deviation * 2 of the Asia axis
            var asiaStdLowerx2 = this.ccdsAsia.mean - this.ccdsAsia.std * 2;
            var asiaStdUpperx2 = this.ccdsAsia.mean + this.ccdsAsia.std * 2;

            this.layout.shapes[5].y0 = asiaStdLowerx2;
            this.layout.shapes[5].y1 = asiaStdUpperx2;

            this.layout.annotations[4].y = asiaStdLowerx2;
            this.layout.annotations[4].text = String(asiaStdLowerx2.toFixed(2));
            this.layout.annotations[5].y = asiaStdUpperx2;
            this.layout.annotations[5].text = String(asiaStdUpperx2.toFixed(2));

            // Labels
            this.layout.annotations[12].y = asiaStdLowerx2;
            this.layout.annotations[13].y = asiaStdUpperx2;

            // Standard deviation of the Europe axis
            var europeStdLower = this.ccdsEurope.mean - this.ccdsEurope.std;
            var europeStdUpper = this.ccdsEurope.mean + this.ccdsEurope.std;

            this.layout.shapes[6].x0 = europeStdLower;
            this.layout.shapes[6].x1 = europeStdUpper;

            this.layout.annotations[6].x = europeStdLower;
            this.layout.annotations[6].text = String(europeStdLower.toFixed(2));
            this.layout.annotations[7].x = europeStdUpper;
            this.layout.annotations[7].text = String(europeStdUpper.toFixed(2));

            // Standard deviation * 2 of the Europe axis
            var europeStdLowerx2 = this.ccdsEurope.mean - this.ccdsEurope.std * 2;
            var europeStdUpperx2 = this.ccdsEurope.mean + this.ccdsEurope.std * 2;

            this.layout.shapes[7].x0 = europeStdLowerx2;
            this.layout.shapes[7].x1 = europeStdUpperx2;

            this.layout.annotations[8].x = europeStdLowerx2;
            this.layout.annotations[8].text = String(europeStdLowerx2.toFixed(2));
            this.layout.annotations[9].x = europeStdUpperx2;
            this.layout.annotations[9].text = String(europeStdUpperx2.toFixed(2));
        }
    }
};

// =========================================================================

export default introgression;
