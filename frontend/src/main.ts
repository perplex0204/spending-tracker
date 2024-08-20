import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@popperjs/core/dist/umd/popper.min.js';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'
const pinia = createPinia()

// 導入 MDI 圖標
import '@mdi/font/css/materialdesignicons.css';

import router from '@/router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);
app.use(VueSidebarMenu);
app.use(vuetify);
app.use(router);
app.use(ElementPlus)
app.use(pinia)
app.mount('#app');
