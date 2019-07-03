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
// Resources of the app, accessed with axios
// =========================================================================

import axios from 'axios';
import store from './store';

// Axios instance
// =========================================================================

const base = axios.create({
    baseURL: '/'
});

// Interceptors
// =========================================================================

base.interceptors.request.use(function (config) {
    store.commit('addRequest');
    return config;
}, function (error) {
    return Promise.reject(error);
});

base.interceptors.response.use(function (response) {
    store.commit('removeRequest');
    return response;
}, function (error) {
    store.commit('removeRequest');
    return Promise.reject(error);
});

// Resources
// =========================================================================

const resources = {

    search: function (params) {
        return base.get('search', { params: params });
    },

    bootstrap: function (params) {
        return base.get('bootstrap', { params: params });
    }
};

// =========================================================================

export default {
    install: function (Vue) {
        Vue.prototype.$resources = resources;
    }
};
