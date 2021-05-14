<template>
  <div class="deck">
    <hgroup>
      <h5>{{ $t(gameId) }}</h5>
      <h1>{{ name }}</h1>
      <h4>{{ numberOfCards }} cards • {{ author }}</h4>
    </hgroup>
    <MartDown class="description">{{ description }}</MartDown>
    <div class="play-deck">
      <localized-link to="play" append><img src="@/assets/icons/play.svg" width="30" height="30" :alt="$t('Play icon')"></localized-link>
      <span>{{ $t('Play') }}</span>
    </div>
  </div>
</template>


<script>
import db from '@/firebase/config'
import MartDown from '@/components/MartDown'

export default {
  components: { MartDown },

  data() {
    return {
      gameId: this.$route.params.gameId,
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
    this.$store.commit('header/setTransparent', false)

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