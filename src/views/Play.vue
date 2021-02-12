<template>
    <main class="play">
        <Header right="howToPlay"></Header>
        <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
        <router-view />

        <div class="main-container">

            <form @submit.prevent="setToLocalstorage">
                <button type="submit">Randomize Deck</button>
            </form>

            <div class="song-title">
                <span class="icon">- </span>
                Blue Swede - Hooked on a Feeling
            </div>
            <h3>You sing:</h3>
            <div id="you-sing">{{ yousing }}</div>
            <h3>They sing:</h3>
            <div id="they-sing">{{ theysing }}</div>
            <hr/>
            <div class="information">
                <p>Pass the phone before hitting next</p>
            </div>
            <div class="navigation">
                CARD 1/125
            </div>
        </div>
    </main>
</template>

<script>
  import db from '@/firebase/config';
  import HowToPlay from '@/components/HowToPlay'
  import Header from '@/components/Header'

  export default {
    components: { HowToPlay, Header },

    data() {
      return {
        showHowToPlay: false,
        'yousing': '',
        'theysing': '',
        'songArray': [],
        'randomizedsongArray': [],
        'localStorageData': []
      }
    },
    methods: {
      shuffle(array) {
        var ctr = array.length, temp, index;
        while (ctr > 0) {
          index = Math.floor(Math.random() * ctr)
          ctr--
          temp = array[ctr]
          array[ctr] = array[index]
          array[index] = temp
        }
        return array
      },
      updateTemplate () {
        this.yousing = JSON.parse(localStorage.getItem('deck-list'))[0][0]['you-sing']
        this.theysing = JSON.parse(localStorage.getItem('deck-list'))[0][0]['they-sing']
      },
      setToLocalstorage () {
        // First clear content from localstorage before setting new value
        localStorage.removeItem("deck-list")
        this.randomizedsongArray = []
        this.shuffle(this.songArray)
        this.randomizedsongArray.push(this.songArray)
        localStorage.setItem("deck-list", JSON.stringify(this.randomizedsongArray))
        this.updateTemplate()
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