import Vue from "vue"
import App from "./App.vue"
import store from './store'
import router from "./router"
import VueI18n from "vue-i18n"
import 'fast-text-encoding'
import { i18n } from 'vue-lang-router'


Vue.use(VueI18n)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app")