<template>
  <div class="play-game">
    
    <div class="card-container" ref="cardContainer">
      <PlayCard>
        <template v-slot:song>{{ song }}</template>
        <template v-slot:artist>{{ artist }}</template>
        <template v-slot:youSing>{{ youSing }}</template>
        <template v-slot:theySing>{{ theySing }}</template>
        <template v-slot:currentCard>{{ currentCard + 1 }}</template>
        <template v-slot:numberOfCards>{{ numberOfCards }}</template>
      </PlayCard>
    </div>

    <div class="information">
      <p>Pass the phone before hitting next</p>
    </div>
    
    <div class="navigation">
      <span :class="currentCard > 0 ? 'icon-cards left colored' : 'icon-cards left'" v-on:click="goToPreviousCard()">
          <img src="@/assets/icons/arrow-next.svg" width="16" height="16" alt="Previous">
      </span>
      <span class="icon-cards right" v-on:click="goToNextCard()">
          <img :src="currentCard === numberOfCards - 1 ? require('@/assets/icons/check.svg') : require('@/assets/icons/arrow-next.svg')" width="16" height="16" alt="Next">
      </span>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import db from '@/firebase/config'
import PlayCard from '@/components/PlayCard'
import { transitionEndEventName } from '@/helpers/animation.js'
import { parseNewLines } from '@/helpers/martdown.js'

  export default {
    components: { PlayCard },

    data() {
      return {
        showHowToPlay: false,
        song: '',
        artist: '',
        youSing: '',
        theySing: '',
        songArray: [],
        numberOfCards: '',
        currentCard: 0,
        currentCardElement: {},
        cardDirection: 'next',
        randomizedSongArray: [],
        localStorageData: [],
        cards: [],
        deckSlug: this.$route.params.deckSlug ? this.$route.params.deckSlug : false,
        transitionEnd: transitionEndEventName(),
      }
    },
    
    methods: {
      async addCard(song, artist, youSing, theySing, currentCard, numberOfCards) {
        let ComponentClass = Vue.extend(PlayCard),
            instance = new ComponentClass(),
            rotationIn = (Math.random()*2-1)*5, //random number between -5 and +5
            rotationOut = (Math.random()*2-1)*5

        youSing = parseNewLines(youSing)
        theySing = parseNewLines(theySing)
        
        instance.$slots.song = song
        instance.$slots.artist = artist
        instance.$slots.youSing = youSing
        instance.$slots.theySing = theySing
        instance.$slots.currentCard = currentCard + 1
        instance.$slots.numberOfCards = numberOfCards
        instance.$mount()
        
        instance.$el.style.transform = this.cardDirection == "next" ? `translateX(60%) translateX(50vw) rotate(${rotationIn}deg)` : `translateX(-60%) translateX(-50vw) rotate(${rotationIn}deg)`
        
        await this.$refs.cardContainer.appendChild(instance.$el)
        this.$refs.cardContainer.style.height = instance.$el.offsetHeight + "px"

        //Run cardAnimationEnd when the transition ends
        instance.$el.addEventListener(this.transitionEnd, this.cardAnimationEnd, {once: true})

        //Animate in new card
        instance.$el.style.transform = ""
        
        //Run removeCard when the transition ends
        this.currentCardElement.addEventListener(this.transitionEnd, this.removeCard, {once: true})

        //Animate out current card
        this.currentCardElement.style.transform = this.cardDirection == "next" ? `translateX(-60%) translateX(-50vw) rotate(${rotationOut}deg)` : `translateX(60%) translateX(50vw) rotate(${rotationOut}deg)`

        //Set new currenCardElement
        this.currentCardElement = instance.$el
      },
      removeCard(event) {
        event.target.remove()
      },
      cardAnimationEnd(event) {
        event.target.style = ""
      },
      shuffle(array) {
        let ctr = array.length, temp, index
        while (ctr > 0) {
          index = Math.floor(Math.random() * ctr)
          ctr--
          temp = array[ctr]
          array[ctr] = array[index]
          array[index] = temp
        }
        return array
      },
      updateTemplate() {
        this.cards = JSON.parse(localStorage.getItem('cards'))
        this.artist = this.cards[this.currentCard]['artist']
        this.song = this.cards[this.currentCard]['song']
        this.youSing = parseNewLines(this.cards[this.currentCard]['youSing'])
        this.theySing = parseNewLines(this.cards[this.currentCard]['theySing'])
      },
      setToLocalstorage() {
        this.randomizedSongArray = this.shuffle(this.songArray)
        localStorage.setItem("cards", JSON.stringify(this.randomizedSongArray))
        this.updateTemplate()
      },
      generatePlayPath(cardPosition) {
        // Remove trailing front slash + digits from current path and add cardPosition
        return this.$route.path.replace(/\/?\d*$/, "") + '/' + cardPosition
      },
      goToCard(cardPosition, replace = true) {
        this.currentCard = cardPosition
        if (replace) {
          this.addCard(this.cards[this.currentCard]['song'], this.cards[this.currentCard]['artist'], parseNewLines(this.cards[this.currentCard]['youSing']), parseNewLines(this.cards[this.currentCard]['theySing']), this.currentCard, this.numberOfCards)
          this.$router.replace({path: this.generatePlayPath(this.currentCard)})
        }
      },
      goToPreviousCard() {
        if (this.currentCard > 0) {
          this.currentCard--
          this.cardDirection = 'previous'
          this.goToCard(this.currentCard)
        }
      },
      goToNextCard() {
        if (this.currentCard < this.numberOfCards - 1) {
          this.currentCard++
          this.cardDirection = 'next'
          this.goToCard(this.currentCard)
        }
        else
          this.finishGame()
      },
      finishGame() {
        if (this.deckSlug)
          this.$router.push({ name: "The end", params: { deckSlug: this.deckSlug } })
        else
          this.$router.push({ name: "The end" })
      }
    },

    created() {
      // Set header right
      this.$store.commit('header/setRight', 'howToPlay')

      //Deck from localStorage (My decks)
      if (!this.$route.params.deckSlug) {
        console.log('Deck from localStorage (My decks)')

        this.songArray = JSON.parse(localStorage.getItem("myDecks"))[this.$route.params.gameId].decks[this.$route.params.deckId].cards
        this.numberOfCards = this.songArray.length

        if (!this.$route.params.cardPosition) //When you just pushed the Play-button
          this.setToLocalstorage()
        else {
          this.currentCard = this.$route.params.cardPosition
          this.updateTemplate()
          this.goToCard(parseInt(this.$route.params.cardPosition), false) //Go to card without route change
        }

      }
      // Deck from db (All decks)
      else {
        db.collection("games").doc(this.$route.params.gameId).collection("decks").doc(this.$route.params.deckId).collection("cards")
          .get()
          .then(snapshot => {
            snapshot.forEach((doc) => {
              this.songArray.push(doc.data())
            })

            this.numberOfCards = snapshot.size

            if (!this.$route.params.cardPosition) //When you just pushed the Play-button
              this.setToLocalstorage()
            else {
              this.currentCard = this.$route.params.cardPosition
              this.updateTemplate()
              this.goToCard(parseInt(this.$route.params.cardPosition), false) //Go to card without route change
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    },

    mounted() {
      this.currentCardElement = this.$refs.cardContainer.firstChild
      console.log(this.currentCardElement.offsetHeight);
      this.$refs.cardContainer.style.height = this.currentCardElement.offsetHeight + "px"
    },
  }
</script>

<style scoped>

</style>