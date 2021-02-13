<template>
  <section class="list-decks">
    <h2>My decks ({{ gameId }})</h2>
    <!-- TODO: Fetch decks from local storage -->
    <div class="decks-group">
      <ul>
        <li>
          <router-link :to="{ name: 'Deck', params: { deckId: 1 } }">
            <img class="game-icon" width="28" height="28" alt="Deck icon" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">My best deck</div>
              <div class="subtitle">5 cards • My Name</div>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
          <router-link :to="{ name: 'Edit deck', params: {deckId: 1} }" class="deck-edit" append>Edit</router-link>
        </li>
        <li>
          <router-link class="add-deck" :to="{ path: 'add-deck'}" append>
            <img class="add-deck" width="28" height="28" alt="Add deck icon" src="@/assets/icons/add-deck.svg" />
            <div class="game-info">
              <div class="title">Add deck (test)</div>
              <div class="subtitle">Missing a deck? Create one here.</div>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <h2>All decks</h2>
    <div class="decks-group">
      <ul>
        <li>
          <router-link :to="{ name: 'Deck', params: { deckId: 1 } }">
            <img class="game-icon" width="28" height="36" alt="" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">My best deck</div>
              <div class="subtitle">5 cards • My Name</div>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ListDecks',
    data() {
      return {
        gameId: this.$route.params.gameId,
      }
    }
  }
</script>

<style scoped>

</style>