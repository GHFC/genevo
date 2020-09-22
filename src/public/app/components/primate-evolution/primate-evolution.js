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
// Scatter plot displaying the dN and dS of the primate's taxons
// =========================================================================

import { mapState } from 'vuex'
import Plotly from 'plotly.js-cartesian-dist'
import chartConfig from '../../mixins/chart-config'

// =========================================================================

const primateEvolution = {
  name: 'primate-evolution',
  mixins: [chartConfig],
  data: function () {
    return {
      chart: null,
      data: [
        {
          name: 'Homo sapiens',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Altaï',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Denisovan',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Pan troglodytes',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Macaca mulatta',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Pongo abelii',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Gorilla gorilla',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        },
        {
          name: 'Callithrix jacchus',
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          hoverinfo: 'text+x+y',
          mode: 'markers',
          marker: {
            size: 8,
            opacity: 0.8,
            symbol: 'circle',
            line: {
              width: 1
            }
          }
        }
      ],
      layout: {
        xaxis: {
          title: 'dS',
          rangemode: 'nonnegative'
        },
        yaxis: {
          title: 'dN',
          rangemode: 'nonnegative'
        },
        hovermode: 'closest',
        margin: {
          t: 30,
          l: 50,
          b: 50
        }
      },
      species: {
        // Translator for the database keys
        'Homo sapiens': 'HS',
        Altaï: 'altai',
        Denisovan: 'denisovan',
        Sidrón: 'sidron',
        Vindija: 'vindija',
        'Pan troglodytes': 'pantro',
        'Macaca mulatta': 'rheMac3',
        'Pongo abelii': 'ponAbe2',
        'Gorilla gorilla': 'gorGor3',
        'Callithrix jacchus': 'calJac3'
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
    selectedDots: function (newValue, oldValue) {
      if (newValue.length) this.selectDots(newValue)
      else this.deselectDots(oldValue)
    }
  },
  methods: {
    clearData: function () {
      this.data.forEach((trace, index) => {
        this.data[index].x = []
        this.data[index].y = []
        this.data[index].text = []
      })
    },
    buildChart: function () {
      if (this.genes.length === 0) return

      this.clearData()

      this.data.forEach((trace, index) => {
        const sp = this.species[trace.name]

        this.genes.forEach((gene) => {
          let dN = ''
          let dS = ''

          if (!gene[this.quality]) {
            dN = NaN
            dS = NaN
          } else {
            dN = gene[this.quality].AN[sp].dN
            dS = gene[this.quality].AN[sp].dS

            if (typeof (dN) !== 'number' || typeof (dS) !== 'number') {
              dN = NaN
              dS = NaN
            }
          }

          this.data[index].x.push(dS)
          this.data[index].y.push(dN)
          this.data[index].text.push(gene.Gene)
        })
      })

      Plotly.react('primate-evolution-chart', this.data, this.layout, this.config).then((chart) => {
        this.chart = chart
        this.setEvents(chart)
      })
    },
    setEvents: function (chart) {
      const origin = this.$options.name

      chart.on('plotly_hover', (data) => {
        const dot = data.points[0].pointNumber
        this.hoverDot(dot)
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
      const traces = []

      for (var i = 0; i <= 7; i++) {
        traces.push({ curveNumber: i, pointNumber: dot })
      }

      Plotly.Fx.hover(this.chart, traces)
    },
    unhoverDot: function (dot) {
      const traces = []

      for (var i = 0; i <= 7; i++) {
        traces.push({ curveNumber: i, pointNumber: dot })
      }

      Plotly.Fx.unhover(this.chart, traces)
    },
    selectDots: function (dots) {
      const opacity = []

      this.chart.data[0].x.forEach(function (x, index) {
        if (dots.indexOf(index) > -1) opacity.push(0.8)
        else opacity.push(0.2)
      })

      Plotly.restyle(this.chart, { 'marker.opacity': [opacity] })
    },
    deselectDots: function (dots) {
      Plotly.restyle(this.chart, { 'marker.opacity': 0.8 })
    }
  }
}

// =========================================================================

export default primateEvolution
