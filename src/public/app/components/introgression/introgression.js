// GenEvo
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

import { mapState } from 'vuex'
import Plotly from 'plotly.js-cartesian-dist'
import chartConfig from '../../mixins/chart-config'

// =========================================================================

const introgression = {
  name: 'introgression',
  mixins: [chartConfig],
  data: function () {
    return {
      chart: null,
      data: {
        x: [],
        y: [],
        text: [],
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: 8,
          opacity: 0.8,
          color: '#2CA02C',
          symbol: 'circle',
          line: {
            width: 1
          }
        }
      },
      layout: {
        xaxis: {
          title: 'CCDS Europe'
        },
        yaxis: {
          title: 'CCDS Asia'
        },
        hovermode: 'closest',
        margin: {
          t: 30,
          l: 50,
          b: 50
        },
        shapes: [
          {
            // Median of the Asia axis
            type: 'line',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: null,
            x1: 1,
            y1: null,
            layer: 'below',
            opacity: 0.8,
            line: {
              color: '#5A94BC',
              width: 3,
              dash: 'dot'
            }
          },
          {
            // Median of the Europe axis
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: null,
            y0: 0,
            x1: null,
            y1: 1,
            layer: 'below',
            opacity: 0.8,
            line: {
              color: '#5A94BC',
              width: 3,
              dash: 'dot'
            }
          },
          {
            // Mean of the Asia axis
            type: 'line',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: null,
            x1: 1,
            y1: null,
            layer: 'below',
            opacity: 1,
            line: {
              color: '#A5A5A5',
              width: 3
            }
          },
          {
            // Mean of the Europe axis
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: null,
            y0: 0,
            x1: null,
            y1: 1,
            layer: 'below',
            opacity: 1,
            line: {
              color: '#A5A5A5',
              width: 3
            }
          },
          {
            // Standard deviation of the Asia axis
            type: 'rect',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: null,
            x1: 1,
            y1: null,
            layer: 'below',
            opacity: 0.08,
            fillcolor: '#A5A5A5',
            line: {
              color: '#A5A5A5',
              width: 1
            }
          },
          {
            // Standard deviation * 2 of the Asia axis
            type: 'rect',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: null,
            x1: 1,
            y1: null,
            layer: 'below',
            opacity: 0.08,
            fillcolor: '#A5A5A5',
            line: {
              color: '#A5A5A5',
              width: 1
            }
          },
          {
            // Standard deviation of the Europe axis
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: null,
            y0: 0,
            x1: null,
            y1: 1,
            layer: 'below',
            opacity: 0.08,
            fillcolor: '#A5A5A5',
            line: {
              color: '#A5A5A5',
              width: 1
            }
          },
          {
            // Standard deviation * 2 of the Europe axis
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: null,
            y0: 0,
            x1: null,
            y1: 1,
            layer: 'below',
            opacity: 0.08,
            fillcolor: '#A5A5A5',
            line: {
              color: '#A5A5A5',
              width: 1
            }
          }
        ],
        annotations: [
          {
            // Median label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            showarrow: false,
            text: 'median'
          },
          {
            // Mean label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            showarrow: false,
            text: 'mean'
          },
          {
            // Standard deviation of the Asia axis (lower limit)
            xref: 'paper',
            yref: 'y',
            x: 1,
            y: null,
            text: '',
            showarrow: false,
            hovertext: 'Lower limit of the standard deviation 1𝜎'
          },
          {
            // Standard deviation of the Asia axis (upper limit)
            xref: 'paper',
            yref: 'y',
            x: 1,
            y: null,
            text: '',
            showarrow: false,
            hovertext: 'Upper limit of the standard deviation 1𝜎'
          },
          {
            // Standard deviation * 2 of the Asia axis (lower limit)
            xref: 'paper',
            yref: 'y',
            x: 1,
            y: null,
            text: '',
            showarrow: false,
            hovertext: 'Lower limit of the standard deviation 2𝜎'
          },
          {
            // Standard deviation * 2 of the Asia axis (upper limit)
            xref: 'paper',
            yref: 'y',
            x: 1,
            y: null,
            text: '',
            showarrow: false,
            hovertext: 'Upper limit of the standard deviation 2𝜎'
          },
          {
            // Standard deviation of the Europe axis (lower limit)
            xref: 'x',
            yref: 'paper',
            x: null,
            y: 1,
            text: '',
            showarrow: false,
            hovertext: 'Lower limit of the standard deviation 1𝜎'
          },
          {
            // Standard deviation of the Europe axis (upper limit)
            xref: 'x',
            yref: 'paper',
            x: null,
            y: 1,
            text: '',
            showarrow: false,
            hovertext: 'Upper limit of the standard deviation 1𝜎'
          },
          {
            // Standard deviation * 2 of the Europe axis (lower limit)
            xref: 'x',
            yref: 'paper',
            x: null,
            y: 1,
            text: '',
            showarrow: false,
            hovertext: 'Lower limit of the standard deviation 2𝜎'
          },
          {
            // Standard deviation * 2 of the Europe axis (upper limit)
            xref: 'x',
            yref: 'paper',
            x: null,
            y: 1,
            text: '',
            showarrow: false,
            hovertext: 'Upper limit of the standard deviation 2𝜎'
          },
          {
            // Standard deviation 1𝜎 lower label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            text: '1𝜎',
            showarrow: false
          },
          {
            // Standard deviation 1𝜎 upper label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            text: '1𝜎',
            showarrow: false
          },
          {
            // Standard deviation 2𝜎 lower label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            text: '2𝜎',
            showarrow: false
          },
          {
            // Standard deviation 2𝜎 upper label
            xref: 'paper',
            yref: 'y',
            x: 1.01,
            y: null,
            xanchor: 'left',
            text: '2𝜎',
            showarrow: false
          }
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
    }
  },
  computed: mapState({
    genes: state => state.genes,
    quality: state => state.quality,
    alleleFq: state => state.alleleFq,
    hoveredDot: state => state.hoveredDot.dot,
    selectedDots: state => state.selectedDots.dots
  }),
  watch: {
    genes: function () { this.buildChart() },
    quality: function () { this.buildChart() },
    alleleFq: function () { this.buildChart() },
    hoveredDot: function (newValue, oldValue) {
      if (typeof (newValue) === 'number') this.hoverDot(newValue)
      else this.unhoverDot(oldValue)
    },
    selectedDots: function (newValue) {
      if (newValue.length) this.selectDots(newValue)
      else this.deselectDots()
    }
  },
  methods: {
    clearData: function () {
      this.data.x = []
      this.data.y = []
      this.data.text = []
    },
    buildChart: function () {
      if (this.genes.length === 0) return

      this.clearData()
      this.setLayout()

      this.genes.forEach((gene) => {
        this.data.text.push(gene.Gene)

        // Get both parameters
        const ccdsEurope = gene.CCDS_PEUR
        const ccdsAsia = gene.CCDS_PASN

        if (typeof (ccdsEurope) !== 'number' || typeof (ccdsAsia) !== 'number') {
          this.data.x.push(NaN)
          this.data.y.push(NaN)
          return
        }

        // Add the results to the list
        this.data.x.push(ccdsEurope)
        this.data.y.push(ccdsAsia)
      })

      Plotly.react('introgression-chart', [this.data], this.layout, this.config).then((chart) => {
        this.chart = chart
        this.setEvents(chart)
      })
    },
    setLayout: function () {
      // Median of the Asia axis
      this.layout.shapes[0].y0 = this.ccdsAsia.median
      this.layout.shapes[0].y1 = this.ccdsAsia.median

      // Label
      this.layout.annotations[0].y = this.ccdsAsia.median

      // Median of the Europe axis
      this.layout.shapes[1].x0 = this.ccdsEurope.median
      this.layout.shapes[1].x1 = this.ccdsEurope.median

      // Mean of the Asia axis
      this.layout.shapes[2].y0 = this.ccdsAsia.mean
      this.layout.shapes[2].y1 = this.ccdsAsia.mean

      // Label
      this.layout.annotations[1].y = this.ccdsAsia.mean

      // Mean of the Europe axis
      this.layout.shapes[3].x0 = this.ccdsEurope.mean
      this.layout.shapes[3].x1 = this.ccdsEurope.mean

      // Standard deviation of the Asia axis
      var asiaStdLower = this.ccdsAsia.mean - this.ccdsAsia.std
      var asiaStdUpper = this.ccdsAsia.mean + this.ccdsAsia.std

      this.layout.shapes[4].y0 = asiaStdLower
      this.layout.shapes[4].y1 = asiaStdUpper

      this.layout.annotations[2].y = asiaStdLower
      this.layout.annotations[2].text = String(asiaStdLower.toFixed(2))
      this.layout.annotations[3].y = asiaStdUpper
      this.layout.annotations[3].text = String(asiaStdUpper.toFixed(2))

      // Labels
      this.layout.annotations[10].y = asiaStdLower
      this.layout.annotations[11].y = asiaStdUpper

      // Standard deviation * 2 of the Asia axis
      var asiaStdLowerx2 = this.ccdsAsia.mean - this.ccdsAsia.std * 2
      var asiaStdUpperx2 = this.ccdsAsia.mean + this.ccdsAsia.std * 2

      this.layout.shapes[5].y0 = asiaStdLowerx2
      this.layout.shapes[5].y1 = asiaStdUpperx2

      this.layout.annotations[4].y = asiaStdLowerx2
      this.layout.annotations[4].text = String(asiaStdLowerx2.toFixed(2))
      this.layout.annotations[5].y = asiaStdUpperx2
      this.layout.annotations[5].text = String(asiaStdUpperx2.toFixed(2))

      // Labels
      this.layout.annotations[12].y = asiaStdLowerx2
      this.layout.annotations[13].y = asiaStdUpperx2

      // Standard deviation of the Europe axis
      var europeStdLower = this.ccdsEurope.mean - this.ccdsEurope.std
      var europeStdUpper = this.ccdsEurope.mean + this.ccdsEurope.std

      this.layout.shapes[6].x0 = europeStdLower
      this.layout.shapes[6].x1 = europeStdUpper

      this.layout.annotations[6].x = europeStdLower
      this.layout.annotations[6].text = String(europeStdLower.toFixed(2))
      this.layout.annotations[7].x = europeStdUpper
      this.layout.annotations[7].text = String(europeStdUpper.toFixed(2))

      // Standard deviation * 2 of the Europe axis
      var europeStdLowerx2 = this.ccdsEurope.mean - this.ccdsEurope.std * 2
      var europeStdUpperx2 = this.ccdsEurope.mean + this.ccdsEurope.std * 2

      this.layout.shapes[7].x0 = europeStdLowerx2
      this.layout.shapes[7].x1 = europeStdUpperx2

      this.layout.annotations[8].x = europeStdLowerx2
      this.layout.annotations[8].text = String(europeStdLowerx2.toFixed(2))
      this.layout.annotations[9].x = europeStdUpperx2
      this.layout.annotations[9].text = String(europeStdUpperx2.toFixed(2))
    },
    setEvents: function (chart) {
      const origin = this.$options.name

      chart.on('plotly_hover', (data) => {
        const dot = data.points[0].pointNumber
        this.$store.commit('setHoveredDot', { dot, origin })
      })

      chart.on('plotly_unhover', () => {
        this.$store.commit('setHoveredDot', { dot: null, origin })
      })

      chart.on('plotly_selected', (data) => {
        if (!data) return

        const dots = data.points
          .filter((point) => { return point.x !== false }) // Filter the NaN points
          .map((point) => { return point.pointNumber }) // Get only the index
          .filter((pointNumber, index, array) => { // Make each index unique
            return array.indexOf(pointNumber) === index
          })

        this.$store.commit('setSelectedDots', { dots, origin })
      })

      chart.on('plotly_deselect', () => {
        this.$store.commit('setSelectedDots', { dots: [], origin })
      })

      chart.on('plotly_doubleclick', () => {
        this.$store.commit('setSelectedDots', { dots: [], origin })
      })
    },
    hoverDot: function (dot) {
      Plotly.Fx.hover(this.chart, [
        { curveNumber: 0, pointNumber: dot }
      ])
    },
    unhoverDot: function (dot) {
      Plotly.Fx.unhover(this.chart, [
        { curveNumber: 0, pointNumber: dot }
      ])
    },
    selectDots: function (dots) {
      const opacity = []

      this.chart.data[0].x.forEach(function (x, index) {
        if (dots.indexOf(index) > -1) opacity.push(0.8)
        else opacity.push(0.2)
      })

      Plotly.restyle(this.chart, { 'marker.opacity': [opacity] })
    },
    deselectDots: function () {
      Plotly.restyle(this.chart, { 'marker.opacity': 0.8 })
    }
  }
}

// =========================================================================

export default introgression
