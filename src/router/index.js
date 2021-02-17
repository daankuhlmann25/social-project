import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import Play from "@/views/Play";
import EditDeck from "@/views/EditDeck";
import Deck from "@/views/Deck";
import TheEnd from "@/views/TheEnd";
import NotFound from "@/views/NotFound";

// GAMES
import Games from "@/views/Games";
import SingTogether from "@/views/games/SingTogether";
import PlaySingTogether from "@/views/games/PlaySingTogether";
import Trivia from "@/views/games/Trivia";
import PlayTrivia from "@/views/games/PlayTrivia";

Vue.use(VueRouter);

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
          'trivia': Trivia,
        }
      },
      {
        path: ":gameId/add-deck",
        name: "Add deck",
        component: EditDeck,
      },
      {
        path: ":gameId/:deckId/edit",
        name: "Edit deck",
        component: EditDeck,
      },
      {
        path: ":gameId/:deckSlug?/:deckId/the-end",
        name: "The end",
        component: TheEnd,
      },
      {
        path: ":gameId/:deckSlug?/:deckId/play/:cardPosition?",
        component: Play,
        children: [
          {
            path: "",
            name: "Play",
            components: {
              'sing-together': PlaySingTogether,
              'trivia': PlayTrivia,
            }
          }
        ]
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
    path: "*",
    name: "Not found",
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
