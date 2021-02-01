import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Games from "../views/Games";
import Play from "../views/Play";
import EditDeck from "../views/EditDeck";
import Deck from "../views/Deck";
import NotFound from "../views/NotFound";
import SingTogether from "../views/games/SingTogether";
import Trivia from "../views/games/Trivia";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/edit-deck",
    name: "Edit deck",
    component: EditDeck,
  },
  {
    path: "/add-deck",
    name: "Add deck",
    component: EditDeck,
  },
  {
    path: "/play",
    name: "Play",
    component: Play,
  },
  {
    path: "/party-games",
    name: "Games",
    component: Games,
  },
  {
    path: "/party-games/sing-together",
    name: "Sing together",
    component: SingTogether,
  },
  {
    path: "sing-together/:id",
    name: "Sing together deck",
    component: Deck,
  },
  {
    path: "/party-games/:gameId/add-deck",
    name: "Add deck",
    component: EditDeck,
  },
  {
    path: "trivia",
    name: "Trivia",
    component: Trivia,
  },
  {
    path: "trivia/:id",
    name: "Trivia deck",
    component: Deck,
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
