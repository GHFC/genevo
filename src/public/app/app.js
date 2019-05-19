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
// Vue instance handling the main page
// =========================================================================

import Vue from 'vue';
import Button from 'element-ui/lib/button';
import Card from 'element-ui/lib/card';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import Input from 'element-ui/lib/input';
import Notification from 'element-ui/lib/notification';
import Option from 'element-ui/lib/option';
import Radio from 'element-ui/lib/radio';
import Select from 'element-ui/lib/select';
import Switch from 'element-ui/lib/switch';

import 'normalize.css';
import './styles/element-theme.scss';

import topbar from './components/topbar/topbar.vue';
import sidebar from './components/sidebar/sidebar.vue';
import bottombar from './components/bottombar/bottombar.vue';
import search from './components/search/search.vue';
import bootstrap from './components/bootstrap/bootstrap.vue';
import dnds from './components/dnds/dnds.vue';
import modernHumans from './components/modern-humans/modern-humans.vue';
import primateEvolution from './components/primate-evolution/primate-evolution.vue';
import introgression from './components/introgression/introgression.vue';
import humanHemisphere from './components/human-hemisphere/human-hemisphere.vue';
import fetalHumanBrain from './components/fetal-human-brain/fetal-human-brain.vue';
import adultHumanBrain from './components/adult-human-brain/adult-human-brain.vue';
import resources from './resources.js';
import store from './store.js';

// =========================================================================

Vue.use(resources);

// Element-UI components
Vue.use(Button);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Switch);

Vue.prototype.$notify = Notification;

// =========================================================================

export default {
    name: 'ns-app',
    components: {
        topbar,
        sidebar,
        bottombar,
        search,
        bootstrap,
        dnds,
        modernHumans,
        primateEvolution,
        introgression,
        humanHemisphere,
        fetalHumanBrain,
        adultHumanBrain
    },
    created: function () {

        // Handle online and offline states properly
        // -----------------------------------------

        const notify = this.$notify;
        let offlineNotification = null;

        window.addEventListener('offline', function () {
            offlineNotification = notify.warning({
                title: 'Network',
                message: 'You are offline.',
                offset: 64,
                duration: 0
            });
        });

        window.addEventListener('online', function () {
            offlineNotification.close();
            notify.success({
                title: 'Network',
                message: 'You are back online.',
                offset: 64
            });
        });

        // -----------------------------------------

    },
    resources: resources,
    store: store
};
