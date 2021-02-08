<template>
  <main class="game sing-together">
    <HeaderComp />
    <GameList v-bind:class="{ show: showGameList }"></GameList>
    <!-- TODO: Fetch info from firebase and parse markdown for How to play (vue-simple-markdown?) -->
    <h1>{{$route.name}}</h1>
    <section class="how-to-play-section">
      <h2>How to play</h2>
      <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
      <p>Pass the phone to the other team and let them go to the next card.</p>
    </section>
    <h2>My decks</h2>
    <!-- TODO: Fetch decks from local storage -->
    <div class="games-group">
      <ul>
        <li>
          <router-link :to="{ name: $route.name + ' deck', params: { id: 1 } }">
            <img class="game-icon" width="28" height="28" alt="Deck icon" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <span class="title">My best deck</span>
              <span class="subtitle">5 cards • My Name</span>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
          <router-link :to="{ name: 'Edit deck', params: {gameId: 1, deckId: 1} }" class="deck-edit">Edit</router-link>
        </li>
        <li>
          <router-link class="add-deck" :to="{ path: 'add-deck'}" append>
            <img class="add-deck" width="28" height="28" alt="Add deck icon" src="@/assets/icons/add-deck.svg" />
            <div class="game-info">
              <span class="title">Add deck (test)</span>
              <span class="subtitle">Missing a deck? Create one here.</span>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <h2>All decks</h2>
    <div class="games-group">
      <ul>
        <li>
          <router-link :to="{ name: $route.name + ' deck', params: { id: 1 } }">
            <img class="game-icon" width="28" height="36" alt="" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <span class="title">My best deck</span>
              <span class="subtitle">5 cards • My Name</span>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>


<script>
import GameList from '@/components/GameList'
import HeaderComp from '@/components/Header'

export default {
  components: { GameList, HeaderComp },
  data() {
    return {
      showGameList: false,
    }
  }
}
</script>

<style scoped>

</style>