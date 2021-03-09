<template>
  <section class="list-decks">
    <h2>My decks</h2>
    <div class="decks-group">
      <ul>
        <li v-for="(deck, index) in myDecks" :key="index">
          <router-link :to="{ name: 'Deck', params: { deckId: index } }">
            <img class="game-icon" width="28" height="28" alt="Deck icon" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">{{ deck.name ? deck.name : "[No name]" }}</div>
              <div class="subtitle">{{ deck.cards.length }} cards • {{ deck.author ? deck.author : "[No author]" }}</div>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
          <router-link :to="{ name: 'Edit deck', params: {deckId: index} }" class="deck-edit" append>Edit</router-link>
        </li>
        <li>
          <router-link class="add-deck" :to="{ path: 'add-deck'}" append>
            <img class="add-deck" width="28" height="28" alt="Add deck icon" src="@/assets/icons/add-deck.svg" />
            <div class="game-info">
              <div class="title">Add deck</div>
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
        <li v-for="(deck, index) in decks" :key="index">
           <router-link :to="{ name: 'Deck', params: { deckSlug: deck.slug, deckId: deck.id } }">
            <img class="game-icon" width="28" height="36" alt="" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">{{ deck.name }}</div>
              <div class="subtitle">{{ deck.numberOfCards }} cards • {{ deck.author }}</div>
            </div>
            <img class="icon-arrow" width="9" height="14" alt="" src="@/assets/icons/arrow-right.svg"/>
          </router-link> 
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import db from '@/firebase/config'

  export default {
    name: 'ListDecks',
    data() {
      return {
        gameId: this.$route.params.gameId,
        decks: [],
        myDecks: [],
      }
    },
    created() {
      this.populateMyDecks()

      db.collection("games").doc(this.gameId).collection("decks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let deck = doc.data()
            deck.id = doc.id
            this.decks.push(deck)
          })
        })
    },
    methods: {
      populateMyDecks() {
        if (localStorage.getItem("myDecks")) {
          const myDecks = JSON.parse(localStorage.getItem("myDecks"))

          this.myDecks = myDecks[this.gameId] && myDecks[this.gameId].decks.length ? myDecks[this.gameId].decks : []
        }
      },
    }
  }
</script>

<style scoped>

</style>