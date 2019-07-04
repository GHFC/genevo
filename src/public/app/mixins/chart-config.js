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
// Common config of the charts
// =========================================================================

export default {
    data: function () {
        return {
            config: {
                showTips: false,
                displaylogo: false,
                modeBarButtonsToRemove: [
                    'sendDataToCloud',
                    'autoScale2d',
                    'hoverClosestCartesian',
                    'hoverCompareCartesian',
                    'toggleSpikelines'
                ],
                modeBarButtonsToAdd: [
                    {
                        // Add a custom button to go to the documentation page for the graph
                        name: "help",
                        title: "Go to the documentation for this graph",
                        click: function (chart) {

                            const chartNames = {
                                'dnds-chart': 'dnds-by-taxon',
                                'modern-humans-chart': 'modern-humans',
                                'primate-evolution-chart': 'primate-evolution',
                                'introgression-chart': 'neanderthal-introgression',
                                'fetal-human-brain-chart': 'fetal-brain',
                                'adult-human-brain-chart': 'adult-brain'
                            };

                            window.open("https://github.com/GHFC/neanderthal-synapse/wiki/Data-panels#" + chartNames[chart.id]);
                        }
                    }
                ]
            }
        }
    }
}
