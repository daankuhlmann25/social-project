<template>
  <div class="edit-deck">
    <h5>{{$route.params.gameId}}</h5>
    <h1>{{$route.name}}</h1>

    <form v-on:change="saveDeck">
      <div class="field title">
        <label for="deck-name"><h2>Deck name:<span class="counter">0/40</span></h2></label>
        <input type="text" id="deck-name" name="deck-name" placeholder="Name your deck" maxlength="40" v-model="name">
      </div>
      <div class="description">
        <label for="description"><h2>Description:</h2></label>
        <textarea name="description" id="description" cols="30" rows="10" placeholder="What is in the deck?" v-model="description"></textarea>
      </div>
      <h2>Cards</h2>
        <div class="cards-container">
            <button type="button" :class="currentCard === index ? 'card selected' : 'card'" @click="selectCard(index)" v-for="(card, index) in cards" :key="card[index]" :v-model="card[index]">{{ index+1 }}</button>
            <button type="button" class="add-card" name="add-card" @click="addCard"><img src="@/assets/icons/plus.svg" width="20" height="20" alt="Plus icon"></button>
        </div>
      <section class="edit-card">
        <input type="hidden" name="currentCard" id="currentCard" v-model="currentCard">
        <label for="artist"><h3>Artist</h3></label>
        <input type="text" name="artist" id="artist" placeholder="Artist name" v-model="artist">
        <label for="song"><h3>Song</h3></label>
        <input type="text" name="song" id="song" v-model="song" placeholder="Song name">
        <label for="youSing"><h3>You sing</h3></label>
        <textarea name="youSing" id="youSing" rows="6" v-model="youSing" placeholder="Lyrics"></textarea>
        <label for="theySing"><h3>They sing</h3></label>
        <textarea name="theySing" id="theySing" rows="6" v-model="theySing" placeholder="Lyrics"></textarea>
        <button type="button" @click="removeCard()" class="delete-card"><img src="@/assets/icons/delete.svg" width="16" height="16" alt="Delete card" title="Delete this card"></button>
      </section>
      <h2>Your name <span class="visibility">Public</span></h2>
      <input type="text" name="author" id="author" v-model="author">
      <h2>E-mail <span class="visibility">Not public</span></h2>
      <input type="email" name="email" id="email" v-model="email">
      <h2>Message <span class="visibility">Not public</span></h2>
      <textarea name="message" id="message" rows="6" v-model="message"></textarea>
      <!-- TODO: Implement something like: https://github.com/runkids/vue2-timeago -->
      <aside class="save-status">
        <p><strong>Deck saved!</strong> <span id="save-time">Just seconds ago</span></p>
      </aside>
      <nav class="deck-navigation">
        <router-link class="button" :to="{ name: 'Game', params: { gameId: this.gameId } }"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Done editing</router-link>
        <router-link class="button right" :to="{ name: 'Deck', params: { deckId: this.deckId } }"><img src="@/assets/icons/deck.svg" width="17" height="17" alt="Play icon">Play deck</router-link>
      </nav>
      <!-- <p v-if="feedback" class="errors">{{ feedback }}</p> -->
      <h2 class="white">Want to publish your deck?</h2>
      <p>We would love you to share your fantastic deck with all our fellow players!</p>
      <p>When you feel happy with your creation, please publish it.</p>
      <button type="button">Publish on social.gg</button>
    </form>

  </div>
</template>

<script>
  // import db from '@/firebase/config';

  export default {
    data() {
      return {
        gameId: this.$route.params.gameId,
        deckId: null,
        currentCard: this.$route.params.cardPosition ? this.$route.params.cardPosition : 0,
        myDecks: {},
        name: "",
        description: "",
        author: "",
        email: "",
        message: "",
        cards: [
            {
              artist: "",
              song: "",
              youSing: "",
              theySing: "",
            },
          ],
        artist: "",
        song: "",
        youSing: "",
        theySing: "",
        // feedback: "",
      }
    },
    created() {

      // Edit an existing deck
      if (this.$route.params.deckId >= 0) {
        console.log("Edit an existing deck");
        this.deckId = this.$route.params.deckId
        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))

        // Does the deck exist?
        if (this.myDecks[this.gameId].decks[this.deckId]) {
          console.log("Deck exists");
          const myDeck = this.myDecks[this.gameId].decks[this.deckId]

          this.name = myDeck.name
          this.description = myDeck.description
          this.author = myDeck.author
          this.email = myDeck.email
          this.message = myDeck.message
          this.cards = myDeck.cards

          this.selectCard(this.currentCard, false, false)
        }
        else {
          console.log("Deck doesn't exist");
          // TODO: Show error saying that we couldn't load the deck
        }
      }
      
      // Add a new deck
      else if (localStorage.getItem("myDecks")) {
        console.log("Add a new deck");
        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))

        // Add a deck in current game
        if (this.myDecks[this.gameId].decks.length) {
          console.log("Add a deck in current game");
          this.deckId = this.myDecks[this.gameId].decks.length
          this.myDecks[this.gameId].decks[this.deckId] = this.generateDeckObject()
          
          this.setMyDecksLocalStorage()
        }
        // First deck in current game
        else {
          console.log("First deck in current game");
          this.deckId = 0
          this.myDecks[this.gameId] = this.generateDecksObject()

          this.setMyDecksLocalStorage()
        }
        
      }

      // The very first deck
      else {
        console.log("The very first deck");
        this.deckId = 0

        localStorage.setItem("myDecks", JSON.stringify({
          [this.gameId]: this.generateDecksObject()
        })
        )
      }
    },
    methods: {
      generateDeckObject() {
        return {
          name: this.name,
          description: this.description,
          author: this.author,
          email: this.email,
          message: this.message,
          cards: this.cards,
        }
      },
      generateDecksObject() {
        return {
            decks: [
              this.generateDeckObject()
            ],
          }
      },
      setMyDecksLocalStorage() {
        localStorage.setItem("myDecks", JSON.stringify(this.myDecks))
      },
      saveDeck() {
        console.log("saveDeck()");

        this.myDecks[this.gameId].decks[this.deckId].name = this.name
        this.myDecks[this.gameId].decks[this.deckId].description = this.description
        this.myDecks[this.gameId].decks[this.deckId].author = this.author
        this.myDecks[this.gameId].decks[this.deckId].email = this.email
        this.myDecks[this.gameId].decks[this.deckId].message = this.message
        this.saveCard()
        this.myDecks[this.gameId].decks[this.deckId].cards = this.cards

        this.setMyDecksLocalStorage()

        // TODO: First add to localstorage, later we can send to DB
        // // Add to database
        // db.collection("games").doc("J3DYLUL2yczOcwUVOBbW").collection("decks").add({
        //   name: this.name,
        //   description: this.description,
        // }).then(() => {
        //   this.$router.push({name: ''})
        // }).catch(err => {
        //   console.log(err)
        // })
      },
      addCard() {
        console.log('addCard'+this.cards.length)
        this.saveCard()
        this.cards.push({
          artist: "",
          song: "",
          youSing: "",
          theySing: "",
        })
        this.selectCard(this.cards.length-1)
        this.setMyDecksLocalStorage()
      },
      removeCard() {
        console.log('removeCard ' + this.currentCard)

        if (this.cards.length === 1)
          this.clearCard(0)

        else {
          console.log('- slice: '+this.currentCard);

          this.cards.splice(this.currentCard, 1)
          this.selectCard(this.getPreviousCard(this.currentCard), false)
        }
        this.setMyDecksLocalStorage()
      },
      getPreviousCard(cardPosition) {
        // Return cardPosition-1 if it's not 0, then return 0
        return cardPosition ? cardPosition-1 : 0;
      },
      generateCardPath(cardPosition) {
        // Remove trailing front slash + digits from current path and add cardPosition
        return this.$route.path.replace(/\/?\d*$/, "") + '/' + cardPosition
      },
      clearCard() {
        console.log('clearCard ' + this.currentCard)

        this.cards[this.currentCard].artist    = this.artist     = ""
        this.cards[this.currentCard].song      = this.song       = ""
        this.cards[this.currentCard].youSing   = this.youSing    = ""
        this.cards[this.currentCard].theySing  = this.theySing   = ""
      },
      selectCard(cardPosition, save = true, replace = true) {
        console.log('selectCard('+cardPosition+")")
        
        if (save)
          this.saveCard()

        if (replace && this.currentCard !== cardPosition)
          this.$router.replace({path: this.generateCardPath(cardPosition)})

        this.currentCard  = cardPosition
        this.artist       = this.cards[cardPosition].artist
        this.song         = this.cards[cardPosition].song
        this.youSing      = this.cards[cardPosition].youSing
        this.theySing     = this.cards[cardPosition].theySing
      },
      saveCard() {
        console.log('saveCard ' + this.currentCard)

        this.cards[this.currentCard].artist     = this.artist
        this.cards[this.currentCard].song       = this.song
        this.cards[this.currentCard].youSing    = this.youSing
        this.cards[this.currentCard].theySing   = this.theySing
      },
    }
  }
</script>

<style scoped>

</style>