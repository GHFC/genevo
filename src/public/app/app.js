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
// import Button from 'element-ui/lib/button';
// import Card from 'element-ui/lib/card';
// import Checkbox from 'element-ui/lib/checkbox';
// import CheckboxGroup from 'element-ui/lib/checkbox-group';
// import DatePicker from 'element-ui/lib/date-picker';
// import Dialog from 'element-ui/lib/dialog';
// import Dropdown from 'element-ui/lib/dropdown';
// import DropdownMenu from 'element-ui/lib/dropdown-menu';
// import DropdownItem from 'element-ui/lib/dropdown-item';
// import Form from 'element-ui/lib/form';
// import FormItem from 'element-ui/lib/form-item';
// import Input from 'element-ui/lib/input';
// import Notification from 'element-ui/lib/notification';
// import Option from 'element-ui/lib/option';
// import Pagination from 'element-ui/lib/pagination';
// import Radio from 'element-ui/lib/radio';
// import RadioGroup from 'element-ui/lib/radio-group';
// import Select from 'element-ui/lib/select';
// import Tabs from 'element-ui/lib/tabs';
// import TabPane from 'element-ui/lib/tab-pane';
// import TableColumn from 'element-ui/lib/table-column';
// import Table from 'element-ui/lib/table';
// import Tag from 'element-ui/lib/tag';
// import Tooltip from 'element-ui/lib/tooltip';

import 'normalize.css';
// import './styles/element-theme.scss';

// import topBar from './pages/topbar/topbar.vue';
// import sideBar from './pages/sidebar/sidebar.vue';

// =========================================================================

// Element-UI components
// Vue.use(Button);
// Vue.use(Card);
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);
// Vue.use(DatePicker);
// Vue.use(Dialog);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Input);
// Vue.use(Option);
// Vue.use(Pagination);
// Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(Select);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Tag);
// Vue.use(Tooltip);

// Vue.prototype.$notify = Notification;

// =========================================================================

export default {
    name: 'ns-app',
    components: {
        // 'ind-header': topBar,
        // 'ind-sidebar': sideBar
    },
    created: function () {
        console.log('Vue works !');

        // Handle online and offline states properly
        // -----------------------------------------

        // const notify = this.$notify;
        // let offlineNotification = null;

        // window.addEventListener('offline', function () {
        //     offlineNotification = notify.warning({
        //         title: 'Network',
        //         message: 'You are now offline.',
        //         offset: 64,
        //         duration: 0
        //     });
        // });

        // window.addEventListener('online', function () {
        //     offlineNotification.close();
        //     notify.success({
        //         title: 'Network',
        //         message: 'You are back online.',
        //         offset: 64
        //     });
        // });

        // -----------------------------------------

    }
};
