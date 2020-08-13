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
// Component handling the top bar
// =========================================================================

const topbar = {
    name: 'topbar',
    data: function () {
        return {
            title: 'GenEvo',
            subtitle: 'Track and explore the evolution of protein-coding genes in primates',
            description: APP_DESCRIPTION,
            contact: APP_CONTACT,
        }
    },
    computed: {
        loading: function () {
            return this.$store.state.loading;
        }
    },
    methods: {
        startIntro: function () {
            this.$intro().start();
        }
    }
};

// =========================================================================

export default topbar;
