<template>
  <section class="list-decks">
    <h2>My decks ({{ gameId }})</h2>
    <div class="decks-group">
      <ul>
        <li>
          <!-- TODO: Make this dynamic, Fetch from localstorage
          Step 1: Add deck and send to localstorage
          Step 2: Retrieve games from localstorage and put in <li> with router-link
          Step 3: Fix Edit Deck and make it possible to edit deck and save it to localstorage
          Step 4: Make it possible to "Send deck" from localstorage to seperate collection in Firebase
          -->

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
              <div class="subtitle">{{ deck.numberOfCards }} cards • {{ deck.user }}</div>
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
      // TODO: Should be like this: db.collection("games").doc(this.$route.params.gameId).collection("decks")
      db.collection("games").doc("J3DYLUL2yczOcwUVOBbW").collection("decks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let deck = doc.data()
            deck.id = doc.id
            this.decks.push(deck)
          })
        })
    },
  }
</script>

<style scoped>

</style>