import Vue from "vue"
import App from "./App.vue"
import store from './store'
import router from "./router"
import VueI18n from "vue-i18n"
import en from "./translations/en.json"
import sv from "./translations/sv.json"
import nl from "./translations/nl.json"
import 'fast-text-encoding'

const messages = {
  en,
  sv,
  nl,
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'sv',
  messages
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app")