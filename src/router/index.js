import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Games from "../views/Games.vue";
import NotFound from "../views/NotFound.vue";
import SongBattle from "../views/games/SongBattle.vue";
import Trivia from "../views/games/Trivia.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/party-games",
    name: "Games",
    component: Games,
    children: [
      {
        path: "song-battle",
        name: "Song battle",
        component: SongBattle
      },
      {
        path: "trivia",
        name: "Trivia",
        component: Trivia
      },
    ]
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
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;