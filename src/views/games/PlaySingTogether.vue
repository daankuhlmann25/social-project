<template>
  <main class="play play-container play-game">
    <Header right="howToPlay"></Header>
    <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
    <form @submit.prevent="setToLocalstorage">
      <button style="display:none" type="submit">Randomize Deck</button>
    </form>

    <div class="current-song-container">
      <div class="current-song">
      <span class="icon"><img src="@/assets/icons/music-note.svg" width="28" height="28"
                              alt="Current song"></span>
          <div class="current-song-container">
              <span class="song-title">{{ song }}</span>
              <span class="song-artist">By: {{ artist }}</span>
          </div>
      </div>
    </div>

    <div class="container-spacer">
      <div class="legend">YOU SING:</div>
      <div id="you-sing">{{ youSing }}</div>
    </div>

    <div class="container-spacer">
      <div class="legend">THEY SING:</div>
      <div id="they-sing">{{ theySing }}</div>
    </div>

    <hr/>
    <div class="information">
      <p>Pass the phone before hitting next</p>
    </div>
    <div class="navigation">
      <span :class="currentCard > 0 ? 'icon-cards left colored' : 'icon-cards left'" v-on:click="goToPreviousCard()">
          <img src="@/assets/icons/arrow-next.svg" width="16" height="16" alt="Previous song">
      </span>
      <span class="amount-of-cards">
        <div class="number">
          <div class="legend">CARD</div>
        </div>
          <span class="counting">
              {{ currentCard + 1 }} / {{ amountOfCards }}
          </span>
      </span>
      <span :class="currentCard === amountOfCards ? 'icon-cards right last' : 'icon-cards right'" v-on:click="goToNextCard()">
          <img src="@/assets/icons/arrow-next.svg" width="16" height="16" alt="Next song">
      </span>
    </div>
  </main>
</template>


<script>
  import Header from '@/components/Header'
  import HowToPlay from '@/components/HowToPlay'
  import db from '@/firebase/config';

  export default {
    components: { HowToPlay, Header },

    data() {
      return {
        showHowToPlay: false,
        artist: '',
        song: '',
        youSing: '',
        theySing: '',
        songArray: [],
        amountOfCards: '',
        currentCard: 0,
        randomizedSongArray: [],
        localStorageData: [],
        cards: [],
      }
    },
    methods: {
      shuffle(array) {
        let ctr = array.length, temp, index;
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
        this.youSing = this.cards[this.currentCard]['you-sing']
        this.theySing = this.cards[this.currentCard]['they-sing']
        localStorage.setItem('currentCard', this.currentCard)
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
        this.updateTemplate()
        if (replace)
          this.$router.replace({path: this.generatePlayPath(this.currentCard)})
      },
      goToPreviousCard() {
        if (this.currentCard > 0) {
          this.currentCard--
          this.goToCard(this.currentCard)
        }
      },
      goToNextCard() {
        if (this.currentCard < this.amountOfCards - 1) {
          this.currentCard++
          this.goToCard(this.currentCard)
        }
        else
          this.finishGame()
      },
      finishGame() {
        this.$router.push({name: "The end"});
      }
    },
    created() {
      //Deck from localStorage (My decks)
      if (!this.$route.params.deckSlug) {
        console.log('My decks');
      }
      // Deck from db (All decks)
      else {
        db.collection("games").doc("kLPcReHvy654lK68qYYE").collection("decks").doc("JQO7kVtkgnkjY60ycauZ").collection("cards")
          .get()
          .then(snapshot => {
            snapshot.forEach((doc) => {
              this.songArray.push(doc.data())
            });

            this.shuffle(this.songArray);
            this.amountOfCards = snapshot.size;

            if (!this.$route.params.cardPosition) //When you just pushed the Play-button
              this.setToLocalstorage()
            else
              this.goToCard(parseInt(this.$route.params.cardPosition), false) //Go to card without route change
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })
      }
    },
    mounted() {
      // this.updateTemplate()
    }
  }
</script>

<style scoped>

</style>