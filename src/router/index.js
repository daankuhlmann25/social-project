import Vue from "vue"
import VueRouter from "vue-router"

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
import language from "@/language"

Vue.use(VueRouter)

let routes = []

if (language == 'sv') {

  routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/sallskapsspel/",
      name: "Games",
      component: Games,
      children: [
        {
          path: ":gameId",
          name: "Game",
          components: {
            // TODO: Change DB structure to be able to translate these
            'sing-together': SingTogether,
            'trivia': Trivia,
            // 'sjung-tillsammans': SingTogether,
            // 'fragesport': Trivia,
          }
        },
        {
          path: ":gameId/lagg-till-kortlek/:cardPosition?",
          name: "Add deck",
          component: EditDeck,
          meta: { disableScroll: true },
        },
        {
          path: ":gameId/:deckId/redigera-kortlek/:cardPosition?",
          name: "Edit deck",
          component: EditDeck,
          meta: { disableScroll: true },
        },
        {
          path: ":gameId/skicka-kortlek",
          name: "Send deck",
          component: SendDeck,
        },
        {
          path: ":gameId/:deckSlug?/:deckId/klar",
          name: "The end",
          component: TheEnd,
          meta: { transitionName: 'fade' }
        },
        {
          path: ":gameId/:deckSlug?/:deckId/spela/:cardPosition?",
          component: Play,
          meta: { smoothScroll: true },
          children: [
            {
              path: "",
              name: "Play",
              components: {
                'sing-together': PlaySingTogether,
                'trivia': PlayTrivia,
                // 'sjung-tillsammans': PlaySingTogether,
                // 'fragesport': PlayTrivia,
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
}
else if (language == 'nl') {

  routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/party-spellen/",
      name: "Games",
      component: Games,
      children: [
        {
          path: ":gameId",
          name: "Game",
          components: {
            'sing-together': SingTogether,
            'trivia': Trivia,
            // 'samen-zingen': SingTogether,
          }
        },
        {
          path: ":gameId/voeg-deck-toe/:cardPosition?",
          name: "Add deck",
          component: EditDeck,
          meta: { disableScroll: true },
        },
        {
          path: ":gameId/:deckId/deck-bewerken/:cardPosition?",
          name: "Edit deck",
          component: EditDeck,
          meta: { disableScroll: true },
        },
        {
          path: ":gameId/deck-verzenden",
          name: "Send deck",
          component: SendDeck,
        },
        {
          path: ":gameId/:deckSlug?/:deckId/het-einde",
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
                'trivia': PlayTrivia,
                // 'samen-zingen': PlaySingTogether,
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
}
else {
  
  routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/party-games/",
      name: "Games",
      component: Games,
      children: [
        {
          path: ":gameId",
          name: "Game",
          components: {
            'sing-together': SingTogether,
            'sjung-tillsammans': SingTogether,
            'trivia': Trivia,
            'fragesport': Trivia,
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
                'fragesport': PlayTrivia,
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
}

const router = new VueRouter({
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
