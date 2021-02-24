<template>
  <div class="deck">
    <hgroup>
      <h5>{{ gameName }}</h5>
      <h1>{{ name }}</h1>
      <h4>{{ numberOfCards }} cards • {{ author }}</h4>
    </hgroup>
    <p>{{ description }}</p>
    <div class="play-deck">
      <router-link to="play" append><img src="@/assets/icons/play.svg" width="30" height="30" alt="Play icon"></router-link>
      <span>Play</span>
    </div>
  </div>
</template>


<script>
import db from '@/firebase/config';

export default {
  data() {
    return {
      gameId: this.$route.params.gameId,
      gameName: this.$parent.niceGameName[this.$route.params.gameId],
      name: "",
      numberOfCards: 0,
      author: "",
      description: "",
      myDecks: {},
    }
  },
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'gameList')

    //Deck from localStorage (My decks)
      if (!this.$route.params.deckSlug) {
        console.log('Deck from localStorage (My decks)')
        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))
        let deck = this.myDecks[this.$route.params.gameId].decks[this.$route.params.deckId]
        this.author = deck.author
        this.description = deck.description
        this.name = deck.name
        let cards = deck.cards
        this.numberOfCards = cards.length
      }
      // Deck from db (All decks)
      else {
        db.collection("games").doc(this.$route.params.gameId).collection("decks").doc(this.$route.params.deckId)
          .get()
          .then(doc => {
            let deck = doc.data()
            this.author = deck.author
            this.description = deck.description
            this.name = deck.name
            this.numberOfCards = deck.numberOfCards
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
  },
}
</script>

<style scoped>

</style>