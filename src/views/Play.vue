<template>
    <main class="play">
        <Header right="howToPlay"></Header>
        <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
        <router-view/>

        <div class="main-container play-game">

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
                <span :class="cardCounter > 0 ? 'icon-cards left colored' : 'icon-cards left'" v-on:click="goToPreviousCard()">
                    <img src="@/assets/icons/arrow-next.svg" width="16" height="16" alt="Previous song">
                </span>
                <span class="amount-of-cards">
                  <div class="number">
                    <div class="legend">CARD</div>
                  </div>
                    <span class="counting">
                        {{ cardCounter + 1 }} / {{ amountOfCards }}
                    </span>
                </span>
                <span class="icon-cards right" v-on:click="goToNextCard()">
                    <img src="@/assets/icons/arrow-next.svg" width="16" height="16" alt="Next song">
                </span>
            </div>
        </div>
    </main>
</template>

<script>
  import db from '@/firebase/config';
  import HowToPlay from '@/components/HowToPlay'
  import Header from '@/components/Header'

  export default {
    components: {HowToPlay, Header},

    data() {
      return {
        showHowToPlay: false,
        'artist': '',
        'song': '',
        'youSing': '',
        'theySing': '',
        'songArray': [],
        'amountOfCards': '',
        'cardCounter': 0,
        'randomizedsongArray': [],
        'localStorageData': [],
        'deckList': [],
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
        this.deckList = JSON.parse(localStorage.getItem('deck-list'))
        this.artist = this.deckList[0][this.cardCounter]['artist']
        this.song = this.deckList[0][this.cardCounter]['song']
        this.youSing = this.deckList[0][this.cardCounter]['you-sing']
        this.theySing = this.deckList[0][this.cardCounter]['they-sing']
      },
      setToLocalstorage() {
        // First clear content from localstorage before setting new value
        localStorage.removeItem("deck-list")
        this.randomizedsongArray = []
        this.shuffle(this.songArray)
        this.randomizedsongArray.push(this.songArray)
        localStorage.setItem("deck-list", JSON.stringify(this.randomizedsongArray))
        this.updateTemplate()
      },
      goToPreviousCard() {
        if (this.cardCounter > 0){
          this.cardCounter = this.cardCounter - 1
          this.updateTemplate()
        }
      },
      goToNextCard() {
        if (this.cardCounter < this.amountOfCards - 1) {
          this.cardCounter = this.cardCounter + 1
          this.updateTemplate()
        } else {
          this.finishGame()
        }
      },
      finishGame() {
        console.log('route to finish component')
      }
    },
    created() {
      // Fetch from database
      db.collection("games").doc("kLPcReHvy654lK68qYYE").collection("decks").doc("JQO7kVtkgnkjY60ycauZ").collection("cards")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.songArray.push(doc.data())
          });
          this.shuffle(this.songArray);
          this.amountOfCards = querySnapshot.size;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        });
    },
    mounted() {
      this.updateTemplate()
    }
  }
</script>

<style scoped>

</style>