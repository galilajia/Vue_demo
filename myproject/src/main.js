// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Header from './components/Header.vue'
import Star from './components/Star/Star.vue'

import './api'
import store from './store'
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.config.productionTip = false
import './validate'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
