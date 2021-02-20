<template>
  <div class="edit-deck">
    <h5>{{$route.params.gameId}}</h5>
    <h1>{{$route.name}}</h1>

    <!-- <form @submit.prevent="addDeck"> -->
    <form v-on:change="addDeck">
      <div class="field title">
        <label for="deck_name"><h2>Deck name:</h2></label>
        <input type="text" id="deck_name" name="deck_name" placeholder="Name your deck" v-model="deck_name">
      </div>
      <div class="description">
        <label for="description"><h2>Description:</h2></label>
        <textarea name="description" id="description" cols="30" rows="10" placeholder="What is in the deck?" v-model="description"></textarea>
      </div>
      <h2>Cards</h2>
        <div class="cards-container">
            <button type="button" :class="card_id === index ? 'card selected' : 'card'" @click="selectCard(index)" v-for="(card, index) in cards" :key="card[index]" :v-model="card[index]">{{ index+1 }}</button>
            <button type="button" class="add-card" name="add-card" @click="addCard"><img src="@/assets/icons/plus.svg" width="20" height="20" alt="Plus icon"></button>
        </div>
      <section class="edit-card">
        <input type="hidden" name="card_id" id="card_id" v-model="card_id">
        <label for="artist"><h3>Artist</h3></label>
        <input type="text" name="artist" id="artist" placeholder="Artist name" v-model="artist" v-on:blur="saveCard">
        <label for="song"><h3>Song</h3></label>
        <input type="text" name="song" id="song" v-model="song" v-on:blur="saveCard" placeholder="Song name">
        <label for="you_sing"><h3>You sing</h3></label>
        <textarea name="you_sing" id="you_sing" rows="6" v-model="you_sing" v-on:blur="saveCard" placeholder="Lyrics"></textarea>
        <label for="they_sing"><h3>They sing</h3></label>
        <textarea name="they_sing" id="they_sing" rows="6" v-model="they_sing" placeholder="Lyrics"></textarea>
        <button type="button" @click="removeCard()" class="delete-card"><img src="@/assets/icons/delete.svg" width="16" height="16" alt="Delete card" title="Delete this card"></button>
      </section>
      <!-- TODO: Implement something like: https://github.com/runkids/vue2-timeago -->
      <aside class="save-status">
        <p><strong>Deck saved!</strong> <span id="save-time">Just seconds ago</span></p>
      </aside>
      <nav class="deck-navigation">
        <router-link  class="button" :to="{ name: 'Game', params: { gameId: this.gameId } }"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Done editing</router-link>
        <router-link class="button right" :to="{ name: 'Deck', params: { deckId: this.deckId } }"><img src="@/assets/icons/deck.svg" width="17" height="17" alt="Play icon">Play deck</router-link>
      </nav>
      <p v-if="feedback" class="errors">{{ feedback }}</p>
      <h2 class="white">Want to publish your deck?</h2>
      <p>We would love you to share your fantastic deck with all our fellow players!</p>
      <p>When you feel happy with your creation, please publish it.</p>
    </form>

<!--                <h2>Name <span>0/40</span></h2>-->
<!--                <input type="text" name="deck-name" id="deck-name" maxlength="40">-->
<!--                <h2>Cards</h2>-->
<!--                <h2>Your name <span>Public</span></h2>-->
<!--                <input type="text" name="name" id="name">-->
<!--                <h2>E-mail <span>Not public</span></h2>-->
<!--                <input type="email" name="email" id="email">-->
<!--                <h2>E-mail <span>Not public</span></h2>-->
<!--                <textarea name="message" id="message" rows="6"></textarea>-->
<!--                <input type="submit" value="Save">-->
<!--                <p>We would love you to share your fantastic deck with all our fellow players!</p>-->
<!--                <p>When you feel happy with your creation, please publish it.</p>-->
<!--                <button type="submit">Publish on social.gg</button>-->
  </div>
</template>

<script>
  // import db from '@/firebase/config';

  export default {
    data() {
      return {
        gameId: this.$route.params.gameId,
        deckId: 1,
        another: null,
        id: null,
        card_id: 0,
        deck_name: null,
        name: null,
        description: null,
        cards: [
            {
              id: '1',
              artist: null,
              song: null,
              you_sing: null,
              they_sing: null,
            },
          ],
        artist: "",
        song: "",
        you_sing: "",
        they_sing: "",
        feedback: null,
      }
    },
    methods: {
      addCard() {
        console.log('addCard'+this.cards.length)
        this.saveCard()
        this.cards.push({
          id: this.cards.length + 1,
          artist: "",
          song: "",
          you_sing: "",
          they_sing: "",
        })
        this.selectCard(this.cards.length-1)

      },
      addDeck() {

        if (this.deck_name) {
          this.feedback = null
          this.localStorageDeck = []

          this.localStorageDeck.push({
                  'Deck name': this.deck_name,
                  'Deck description': this.description,
                  'Deck cards': [this.cards],
          });
          console.dir(this.cards);
          console.log('LOCALSTORAGE = '+JSON.stringify(this.localStorageDeck))

          this.setToLocalstorage()

          // TODO: First add to localstorage, later we can send to DB
          // // Add to database
          // db.collection("games").doc("kLPcReHvy654lK68qYYE").collection("decks").add({
          //   id: this.id,
          //   name: this.deck_name,
          //   description: this.description,
          // }).then(() => {
          //   this.$router.push({name: ''})
          // }).catch(err => {
          //   console.log(err)
          // })

        } else {
          this.feedback = 'You must enter a deck name!'
        }
      },
      updateTemplate() {
        // TODO: Place contents in fields if localstorage exists

        this.customAddDeck = JSON.parse(localStorage.getItem('customAddDeck'))
        // this.artist = this.cards[this.currentCard]['artist']
        // this.song = this.cards[this.currentCard]['song']
        // this.youSing = this.cards[this.currentCard]['you-sing']
        // this.theySing = this.cards[this.currentCard]['they-sing']
      },
      setToLocalstorage() {
        localStorage.setItem("customAddDeck", JSON.stringify(this.localStorageDeck))
        this.updateTemplate()
      },
      removeCard() {
        console.log('removeCard ' + this.card_id)

        if (this.cards.length === 1)
          this.clearCard(0)

        else {
          console.log('- slice: '+this.card_id);

          this.cards.splice(this.card_id, 1)
          this.selectCard(this.getPreviousCard(this.card_id), false)
        }
      },
      getPreviousCard(cardId) {
        // Return cardId-1 if it's not 0, then return 0
        return cardId ? cardId-1 : 0;
      },
      clearCard() {
        console.log('clearCard ' + this.card_id)

        this.cards[this.card_id].artist     = this.artist     = ""
        this.cards[this.card_id].song       = this.song       = ""
        this.cards[this.card_id].you_sing   = this.you_sing   = ""
        this.cards[this.card_id].they_sing  = this.they_sing  = ""
      },
      selectCard(cardId, save = true) {
        console.log('selectCard('+cardId+")")

        if (save)
          this.saveCard()

        this.card_id    = cardId
        this.artist     = this.cards[cardId].artist
        this.song       = this.cards[cardId].song
        this.you_sing   = this.cards[cardId].you_sing
        this.they_sing  = this.cards[cardId].they_sing
      },
      saveCard() {
        console.log('saveCard ' + this.card_id)

        this.cards[this.card_id].artist     = this.artist
        this.cards[this.card_id].song       = this.song
        this.cards[this.card_id].you_sing   = this.you_sing
        this.cards[this.card_id].they_sing  = this.they_sing
      },
    }
  }
</script>

<style scoped>

</style>