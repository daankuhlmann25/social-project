import Vue from "vue"
import App from "./App.vue"
import store from './store'
import language from "./language"
import router from "./router"
import VueI18n from "vue-i18n"
import messages from "./translations"
import 'fast-text-encoding'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: language,
  messages
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app")