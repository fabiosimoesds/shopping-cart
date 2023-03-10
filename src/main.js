// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import { currency } from './currency'

Vue.config.productionTip = false

Vue.filter('currency', currency)

Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

