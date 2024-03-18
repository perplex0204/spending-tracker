import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@popperjs/core/dist/umd/popper.min.js'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from '@/router' // ++ 将上一步骤配置 router导入

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(VueSidebarMenu)
app.use(vuetify)
app.use(router)
app.mount('#app')
