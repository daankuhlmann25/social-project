import Vue from "vue"
import LangRouter from 'vue-lang-router'

import Home from "@/views/Home"
import Play from "@/views/Play"
import EditDeck from "@/views/EditDeck"
import Deck from "@/views/Deck"
import TheEnd from "@/views/TheEnd"
import NotFound from "@/views/NotFound"

// GAMES
import Games from "@/views/Games"
import SingTogether from "@/views/games/SingTogether"
import PlaySingTogether from "@/views/games/PlaySingTogether"
import Trivia from "@/views/games/Trivia"
import PlayTrivia from "@/views/games/PlayTrivia"
import SendDeck from "@/views/SendDeck"

// TOOLS
import UpdateDatabase from "@/tools/UpdateDatabase"
import translations from '../lang/translations'
import localizedURLs from '../lang/localized-urls'

Vue.use(LangRouter, {
	defaultLanguage: 'en',// TODO: Set this depending on the domain name
	translations,
	localizedURLs,
})

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/party-games/",
    component: Games,
    children: [
      {
        path: ":gameId",
        name: "Game",
        components: {
          'sing-together': SingTogether,
          'sjung-tillsammans': SingTogether,
          'trivia': Trivia,
          'fragor-och-svar': Trivia,
        }
      },
      {
        path: ":gameId/add-deck/:cardPosition?",
        name: "Add deck",
        component: EditDeck,
        meta: { disableScroll: true },
      },
      {
        path: ":gameId/:deckId/edit-deck/:cardPosition?",
        name: "Edit deck",
        component: EditDeck,
        meta: { disableScroll: true },
      },
      {
        path: ":gameId/send-deck",
        name: "Send deck",
        component: SendDeck,
      },
      {
        path: ":gameId/:deckSlug?/:deckId/the-end",
        name: "The end",
        component: TheEnd,
        meta: { transitionName: 'fade' }
      },
      {
        path: ":gameId/:deckSlug?/:deckId/play/:cardPosition?",
        component: Play,
        meta: { smoothScroll: true },
        children: [
          {
            path: "",
            name: "Play",
            components: {
              'sing-together': PlaySingTogether,
              'sjung-tillsammans': PlaySingTogether,
              'trivia': PlayTrivia,
              'fragor-och-svar': PlayTrivia,
            }
          }
        ],
      },
      {
        path: ":gameId/:deckSlug?/:deckId",
        name: "Deck",
        component: Deck,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
    import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/update-db",
    name: "Update database",
    component: UpdateDatabase,
  },
  {
    path: "*",
    name: "Not found",
    component: NotFound,
  }
]

const router = new LangRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {

    //Only disable scroll if cardPosition is defined
    if (to.matched.some(m => m.meta.disableScroll) && (to.params.cardPosition ?? false))
      return
    
    const position = {
      x: 0,
      y: 0,
      behavior: 'auto',
    }
    
    //Only use smooth if cardPosition is defined
    if (to.matched.some(m => m.meta.smoothScroll) && (to.params.cardPosition ?? false))
      position.behavior = 'smooth'
  
    if (savedPosition) {
      position.x = savedPosition.x
      position.y = savedPosition.y
    }
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position)
      }, 250)
    })
  }
})

export default router
