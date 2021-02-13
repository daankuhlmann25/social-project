<template>
    <div id="how-to-play">
        <div class="how-to-play">
            <a v-on:click="close()" class="close">
                <img alt="Close" src="@/assets/icons/close.svg"/>
            </a>
              <hgroup>
                <h5>Sing together</h5>
                <h2>How to play</h2>
              </hgroup>
              <section class="how-to-play-content">
                <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
                <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
                <p>Pass the phone to the other team and let them go to the next card.</p>
                <h3>What you need</h3>
                <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
              </section>
        </div>
    </div>
</template>

<script>
  // import db from '@/firebase/config';

  export default {
    name: 'HowToPlay',
    data() {
      return {
        games: []
      }
    },
    methods: {
      close() {
        this.$parent.showHowToPlay = false;
      },
    },
    created() {
      //TODO: Fetch data from database (local storage)
      // db.collection('games').get()
      //   .then(snapshot => {
      //     snapshot.forEach(doc => {
      //       console.log(doc.id, " => ", doc.data());
      //       let game = doc.data()
      //       game.id = doc.id
      //       this.games.push(game)
      //     })
      //   })
    }
  };
</script>

<style scoped>

</style>