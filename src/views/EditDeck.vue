<template>
    <main class="edit-deck">
        <Header />
        <h5>{{$route.params.gameId}}</h5>
        <h1>{{$route.name}}</h1>

        <form @submit.prevent="AddDeck">
            <div class="field title">
                <label for="name"><h2>Deck name:</h2></label>
                <input type="text" name="deck_name" placeholder="Deck name" v-model="deck_name">
            </div>
            <div class="description">
                <label for="description"><h2>Description:</h2></label>
                <textarea name="description" id="description" cols="30" rows="10" placeholder="What is in the deck?" v-model="description"></textarea>
            </div>
<!--            <div v-for="(ing, index) in cards" :key="index">-->
<!--                <label for="card"><h2>Card:</h2></label>-->
<!--                <input type="text" name="card" v-model="cards[index]">-->
<!--            </div>-->
<!--            <div class="add-card">-->
<!--                <label for="add-card"><h2>Add a card:</h2></label>-->
<!--                <input type="text" name="add-card" @keydown.tab.prevent="addCard" v-model="cards[index]">-->
<!--            </div>-->
            <button type="submit">Save Deck</button>
            <p v-if="feedback" class="errors">{{ feedback }}</p>

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
<!--                <textarea name="message" id="message" cols="30" rows="10"></textarea>-->
<!--                <input type="submit" value="Save">-->
<!--                <p>We would love you to share your fantastic deck with all our fellow players!</p>-->
<!--                <p>When you feel happy with your creation, please publish it.</p>-->
<!--                <button type="submit">Publish on social.gg</button>-->
    </main>
</template>

<script>
  import db from '@/firebase/config';
  import Header from '@/components/Header'

  export default {
    components: { Header },
    data() {
      return {
        gameId: Number,
        deckId: Number,
        another: null,
        id: null,
        deck_name: null,
        name: null,
        description: null,
        cards: [],
        feedback: null,
      }
    },
    methods: {
      AddDeck() {
        console.log('Deck name = '+this.deck_name)
        console.log('Description = '+this.description)

        if (this.deck_name) {
          this.feedback = null

          // Add to database
          db.collection("games").doc("kLPcReHvy654lK68qYYE").collection("decks").add({
            id: this.id,
            name: this.deck_name,
            description: this.description,
          }).then(() => {
            this.$router.push({name: ''})
          }).catch(err => {
            console.log(err)
          })

        } else {
          this.feedback = 'You must enter a deck name!'
        }
      },
      AddCard() {
        console.log('AddCard runned')
        if (this.another) {
          this.cards.push(this.another)
          this.another = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add a card!'
        }
      }
    }
  }
</script>

<style scoped>

</style>