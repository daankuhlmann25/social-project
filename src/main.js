import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true

const NotFound = { template: '<p>Page not found</p>' }
const Start = App
const Game = { template: '<p>Game page</p>' }

const routes = {
  '/': Start,
  '/game': Game
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})

// new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       return routes[this.currentRoute] || NotFound
//     }
//   },
//   render: h => h(App),
// }).$mount('#app')
