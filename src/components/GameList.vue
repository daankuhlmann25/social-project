<template>
  <div id="game-list">
    <!-- TODO: Implement https://github.com/willmcpo/body-scroll-lock when it's an overlay -->
    <div class="game-list">
      <a v-on:click="closeGameList" class="close">
        <img alt="Close" src="@/assets/icons/close.svg"/>
      </a>
      <section class="games-group">
        <h2>Party games</h2>
        <ul>
          <li v-for="(game, index) in games" :key="index" v-on:click="closeGameList">
            <router-link :to="'/party-games/' + game.slug">
              <img class="game-icon" width="50" height="50" :alt="game['icon-name'] + ' icon'" :src="iconUrl(game['icon-name'])"/>
              <div class="game-info">
                <span class="title">{{ game.title }}</span>
                <span class="subtitle">{{ game.subtitle }}</span>
              </div>
              <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="games-group">
        <h2>Conversation games</h2>
        <ul>
          <li v-on:click="closeGameList">Conversation starters</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/config';
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GameList',
  data() {
    return {
      games: []
    }
  },
  computed: {
    ...mapState({
      showGameList: state => state.header.showGameList,
    }),
  },
  methods: {
    ...mapMutations({
      closeGameList: 'header/closeGameList',
    }),
    iconUrl(icon) {
      const url = require('@/assets/icons/game-icon-' + icon + '.svg');
      return url;
    }
  },
  created() {
    //Fetch data from database
    db.collection('games').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          let game = doc.data()
          game.id = doc.id
          this.games.push(game)
        })
      })
  }
};
</script>

<style scoped>

</style>