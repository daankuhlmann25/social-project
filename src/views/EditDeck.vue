<template>
  <div class="edit-deck">
    <ConfirmModal v-if="showDeleteModal" @cancel="showDeleteModal = false" @confirm="deleteDeck()">
      <template v-slot:heading>Delete the deck?</template>
      <template v-slot:body>This will remove the deck and all the cards in it.</template>
      <template v-slot:confirm>Delete</template>
    </ConfirmModal>
    <InfoModal v-if="showFormattingModal" @close="showFormattingModal = false">
      <template v-slot:heading>Formatting help</template>
      <template v-slot:body>
        <h3>Bold</h3>
        <p>This text is *bold.*</p>
        <h3>Italic</h3>
        <p>Because it is very _important._</p>
        <h3>Strike through</h3>
        <p>Please -forget- about that.</p>
        <h3>Bullet list</h3>
        <p>Remember to:<br>
          * Sing out of tune<br>
          * Dance<br>
          * Have *fun*<br>
        </p>
        <h3>Numbered list</h3>
        <p>Steps:<br>
          # Raise your hand<br>
          # Wave<br>
          # Smile<br>
        </p>
        <h3>Horizontal rule</h3>
        <p>Two dashes on a new line separates this text<br>
          --<br>
          from this one with a horizontal rule.</p>
      </template>
    </InfoModal>
    <h5>{{ gameName }}</h5>
    <h1>{{ $route.name }}</h1>

    <form v-on:change="saveDeck">
      <div class="field title">
        <label for="deck-name"><h2>Deck name:<span class="counter">{{ name.length }}/40</span></h2></label>
        <input type="text" id="deck-name" name="deck-name" placeholder="Name your deck" maxlength="40" v-model="name">
      </div>
      <div class="description">
        <label for="description"><h2>Description:</h2></label>
        <textarea name="description" id="description" rows="3" placeholder="What is in the deck?" v-model="description"></textarea>
        <a @click.prevent="showFormattingModal = true" href="#" class="button small">Formatting help</a>
      </div>
      <h2>Cards</h2>
        <div class="cards-container">
            <button type="button" :class="currentCard == index ? 'card selected' : 'card'" @click="selectCard(index)" v-for="(card, index) in cards" :key="card[index]" :v-model="card[index]">{{ index+1 }}</button>
            <button type="button" class="add-card" name="add-card" @click="addCard"><img src="@/assets/icons/plus.svg" width="20" height="20" alt="Plus icon"></button>
        </div>
      <section class="edit-card">
        <input type="hidden" name="currentCard" id="currentCard" v-model="currentCard">
        <component v-bind:is="gameId" v-model="card"></component>
        <button type="button" @click="removeCard()" class="delete-card" title="Delete this card"><img src="@/assets/icons/delete.svg" width="16" height="16" alt="Delete icon"></button>
      </section>
      <label for="author"><h2>Your name <span class="visibility">Public</span></h2></label>
      <input type="text" name="author" id="author" v-model="author">
      <label for="email"><h2>E-mail <span class="visibility">Not public</span></h2></label>
      <input type="email" name="email" id="email" v-model="email">
      <label for="message"><h2>Message <span class="visibility">Not public</span></h2></label>
      <textarea name="message" id="message" rows="3" v-model="message"></textarea>
      <!-- TODO: Implement something like: https://github.com/runkids/vue2-timeago -->
      <aside class="save-status">
        <p><strong>Deck saved!</strong> <span id="save-time">Just seconds ago</span></p>
      </aside>
      <nav class="deck-navigation">
        <div class="play-deck">
          <router-link :to="{ name: 'Deck', params: { deckId: this.deckId } }"><img src="@/assets/icons/play.svg" width="30" height="30" alt="Play icon"></router-link>
          <span>Play deck</span>
        </div>
        <div class="nav-group">
          <router-link class="button" :to="{ name: 'Game', params: { gameId: this.gameId } }"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Done editing</router-link>
          <a @click.prevent="showDeleteModal = true" href="#" class="button delete-deck" title="Delete this deck"><img src="@/assets/icons/delete.svg" width="16" height="16" alt="Delete icon">Delete deck</a>
        </div>
      </nav>
      <!-- TODO: What feedback do we need? How do we want it to work? -->
      <!-- <p v-if="feedback" class="errors">{{ feedback }}</p> -->
      <h2 class="white">Want to publish your deck?</h2>
      <p>We would love you to share your fantastic deck with all our fellow players!</p>
      <p>When you feel happy with your creation, please publish it.</p>
      <button type="button" class="submit">Send for review</button>
    </form>
  </div>
</template>

<script>
  // import db from '@/firebase/config'
  import ConfirmModal from '@/components/ConfirmModal'
  import InfoModal from '@/components/InfoModal'
  import singTogether from '@/components/card-fields/SingTogether'
  import trivia from '@/components/card-fields/Trivia'
  import { setResizeListeners, resizeTextareas } from "@/helpers/auto-resize.js"

  export default {
    components: {
      ConfirmModal,
      InfoModal,
      singTogether,
      trivia,
     },
    data() {
      return {
        gameId: this.$route.params.gameId,
        gameName: this.$parent.niceGameName[this.$route.params.gameId],
        deckId: null,
        currentCard: this.$route.params.cardPosition ? this.$route.params.cardPosition : 0,
        myDecks: {},
        name: "",
        description: "",
        author: "",
        email: "",
        message: "",
        cards: [],
        cardFields: new Map(),
        card: {},
        showDeleteModal: false,
        showFormattingModal: false,
        // feedback: "",
      }
    },
    updated() {
      this.$nextTick(function () {
        resizeTextareas(this.$el, "textarea")
      })
    },
    created() {
      //Init 
      this.generateCardFieldsMap()

      // Edit an existing deck
      if (this.$route.params.deckId >= 0) {
        console.log("Edit an existing deck")
        this.deckId = this.$route.params.deckId
        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))

        // Does the deck exist?
        if (this.myDecks[this.gameId].decks[this.deckId]) {
          console.log("Deck exists")
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
          console.log("Deck doesn't exist")
          // TODO: Show error saying that we couldn't load the deck
          this.addCard(true)
        }
      }
      
      // Add a new deck
      else if (localStorage.getItem("myDecks")) {
        console.log("Add a new deck")
        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))

        // Add a deck in current game
        if (this.myDecks[this.gameId] && this.myDecks[this.gameId].decks.length) {
          console.log("Add a deck in current game")
          this.deckId = this.myDecks[this.gameId].decks.length
          this.addCard(true)
          this.myDecks[this.gameId].decks[this.deckId] = this.generateDeckObject()
          
          this.setMyDecksLocalStorage()
        }
        // First deck in current game
        else {
          console.log("First deck in current game")
          this.deckId = 0
          this.addCard(true)

          this.myDecks[this.gameId] = this.generateDecksObject()

          this.setMyDecksLocalStorage()
        }
        
      }

      // The very first deck
      else {
        console.log("The very first deck")
        this.deckId = 0
        this.addCard(true)

        localStorage.setItem(
          "myDecks", 
          JSON.stringify(
            {
              [this.gameId]: this.generateDecksObject()
            }
          )
        )

        this.myDecks = JSON.parse(localStorage.getItem("myDecks"))
      }
    },
    mounted() {
      setResizeListeners(this.$el, "textarea")
    },
    methods: {
      generateCardFieldsMap() {
        let map = new Map()

        if (this.gameId == "sing-together") {
          map.set("artist", "")
            .set("song", "")
            .set("youSing", "")
            .set("theySing", "")
        }

        else if (this.gameId == "trivia") {
          map.set("question", "")
            .set("answer", "")
        }

        this.cardFields = map
      },
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
        console.log("saveDeck()")

        this.myDecks[this.gameId].decks[this.deckId].name = this.name
        this.myDecks[this.gameId].decks[this.deckId].description = this.description
        this.myDecks[this.gameId].decks[this.deckId].author = this.author
        this.myDecks[this.gameId].decks[this.deckId].email = this.email
        this.myDecks[this.gameId].decks[this.deckId].message = this.message
        this.saveCard()
        this.myDecks[this.gameId].decks[this.deckId].cards = this.cards

        this.setMyDecksLocalStorage()
      },
      // sendToDB() {
        // TODO: First add to localstorage, later we can send to DB
        // // Add to database
        // db.collection("games").doc(this.$route.params.gameId).collection("decks").add({
        //   name: this.name,
        //   description: this.description,
        // }).then(() => {
        //   this.$router.push({name: ''})
        // }).catch(err => {
        //   console.log(err)
        // })
      // },
      addCard(firstCard) {
        console.log('addCard ' + this.cards.length)

        firstCard = typeof firstCard == "boolean" ? firstCard : false
        let cardTemplate = {}

        this.cardFields.forEach(function(value, key) {
          cardTemplate[key] = value
        })
        
        if (!firstCard)
          this.saveCard()
        
        this.cards.push(cardTemplate)
        this.selectCard(this.cards.length-1)

        if (!firstCard)
          this.setMyDecksLocalStorage()
      },
      removeCard() {
        console.log('removeCard ' + this.currentCard)

        if (this.cards.length === 1)
          this.clearCard(0)

        else {
          this.cards.splice(this.currentCard, 1)
          this.selectCard(this.getPreviousCard(this.currentCard), false)
        }

        this.setMyDecksLocalStorage()
      },
      deleteDeck(doRouterReplace = true) {
        console.log('deleteDeck() ' + this.deckId)

        this.myDecks[this.gameId].decks.splice(this.deckId, 1)
        this.setMyDecksLocalStorage()

        if (doRouterReplace)
          this.$router.replace({name: 'Game', params: { gameId: this.gameId }})
      },
      getPreviousCard(cardPosition) {
        // Return cardPosition-1 if it's not 0, then return 0
        return cardPosition ? cardPosition-1 : 0
      },
      generateCardPath(cardPosition) {
        // Remove trailing front slash + digits from current path and add cardPosition
        return this.$route.path.replace(/\/?\d*$/, "") + '/' + cardPosition
      },
      clearCard() {
        console.log('clearCard ' + this.currentCard)

        //Clear both this.card and this.cards values on current card
        this.cardFields.forEach(function(value, key) {
          this.cards[this.currentCard][key] = this.card[key] = ""
        }, this)
      },
      selectCard(cardPosition, save = true, replace = true) {
        console.log('selectCard('+cardPosition+")")

        if (save)
          this.saveCard()

        if (replace && this.currentCard != cardPosition)
          this.$router.replace({path: this.generateCardPath(cardPosition)})
        
        this.currentCard = cardPosition

        //Populate this.card values with selected card
        this.cardFields.forEach(function(value, key) {

          //Using $set() to make this.card.xxx reactive
          this.$set(this.card, key, this.cards[cardPosition][key])
        }, this)
      },
      saveCard() {
        console.log('saveCard ' + this.currentCard)

        this.cardFields.forEach(function(value, key) {
          this.cards[this.currentCard][key] = this.card[key]
        }, this)
      },
    },
    beforeRouteLeave (to, from, next) {

    // If going back to Game view
    if (to.name == "Game") {
      const myDeck = this.myDecks[this.gameId].decks[this.deckId]

      //If the deck is completely empty
      if (
        myDeck &&
        myDeck.cards &&
        myDeck.cards.length == 1 &&
        myDeck.name == "" &&
        myDeck.description == "" &&
        myDeck.author == "" &&
        myDeck.email == "" &&
        myDeck.message == ""
        ) {
          
          // Check if all card fields are empty
          const deleteDeck = Array.from(this.cardFields.keys()).every(function(key) {
            return (typeof myDeck.cards[0][key] == "undefined" || myDeck.cards[0][key] == "")
          }, this)
          
          if (deleteDeck)
            this.deleteDeck(false)
      }
    }

    next()
   },
  }
</script>

<style scoped>

</style>