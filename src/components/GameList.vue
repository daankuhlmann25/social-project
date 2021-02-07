<template>
    <div id="game-list">
        <div class="game-list">
            <a v-on:click="close()" class="close">
                <img alt="" src="../assets/icons/close.svg"/>
            </a>
            <section class="games-group">
                <h2>Party games</h2>
                <ul>
                    <li v-for="(game, index) in games" :key="index" v-on:click="close()">
                        <router-link :to="{ name: game.title }">
                            <img class="game-icon" width="36" height="36" alt="" src="../assets/icons/game-icon-music.svg"/>
                            <div class="game-info">
                                <span class="title">{{ game.title }}</span>
                                <span class="subtitle">{{ game.subtitle }}</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </section>
            <section class="games-group">
                <h2>Conversation games</h2>
                <ul>
                    <li v-on:click="close()">Conversation starters</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
  import db from '@/firebase/config';

  export default {
    name: 'Index',
    data() {
      return {
        games: []
      }
    },
    methods: {
      close() {
        this.$parent.show = false;
      },
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