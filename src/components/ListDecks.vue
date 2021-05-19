<template>
  <section class="list-decks">
    <div class="decks-group" v-if="myDecks.length">
      <h2>{{ $t('My decks') }}</h2>
      <ul>
        <li v-for="(deck, index) in myDecks" :key="index">
          <router-link :to="{ name: 'Deck', params: { deckId: index } }">
            <img class="game-icon" width="28" height="28" :alt="$t('Deck icon')" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">{{ deck.name ? deck.name : "[No name]" }}</div>
              <div class="subtitle">{{ deck.cards.length }} {{ $t('cards') }} • {{ deck.author ? deck.author : "[No author]" }}</div>
            </div>
            <img class="icon-arrow" width="9" height="14" :alt="$t('Arrow right icon')" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
          <router-link :to="{ name: 'Edit deck', params: {deckId: index} }" class="deck-edit" append>{{ $t('Edit') }}</router-link>
        </li>
        <li>
          <router-link class="add-deck" :to="{ path: `${gameURI}/add-deck`}">
            <img class="add-deck" width="28" height="28" :alt="$t('Add deck icon')" src="@/assets/icons/add-deck.svg" />
            <span>{{ $t('Add deck') }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="decks-group">
      <h2>{{ $t('Popular decks') }}</h2>
      <ul>
        <li v-for="(deck, index) in decks" :key="index">
           <router-link :to="{ name: 'Deck', params: { deckSlug: deck.slug, deckId: deck.id } }">
            <img class="game-icon" width="28" height="36" :alt="$t('Deck icon')" src="@/assets/icons/deck.svg" />
            <div class="game-info">
              <div class="title">{{ deck.name }}</div>
              <div class="subtitle">{{ deck.numberOfCards }} {{ $t('cards') }} • {{ deck.author }}</div>
            </div>
            <img class="icon-arrow" width="9" height="14" :alt="$t('Arrow right icon')" src="@/assets/icons/arrow-right.svg"/>
          </router-link> 
        </li>
        <li>
          <router-link class="deck-category" :to="{ path: `${gameURI}/category/popular-decks`, params: { gameId: this.gameId } }">
            <span class="title">{{ $t('Show more decks') }}</span>
            <img class="icon-arrow" width="9" height="14" :alt="$t('Arrow right icon')" src="@/assets/icons/arrow-right.svg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="decks-group" v-if="!myDecks.length">
      <h2>{{ $t('My decks') }}</h2>
      <ul>
        <li>
          <div class="empty">
            <div class="title">{{ $t('No decks, yet!') }}</div>
            <div class="subtitle">{{ $t('If you create your own decks, this is where you’ll find them.') }}</div>
          </div>
        </li>
        <li>
          <router-link class="add-deck" :to="{ path: `${gameURI}/add-deck`}">
            <img class="add-deck" width="28" height="28" :alt="$t('Add deck icon')" src="@/assets/icons/add-deck.svg" />
            <span>{{ $t('Add deck') }}</span>
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
        gameURI: `${this.$route.matched[0].path}/${this.$route.params.gameId}`,
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