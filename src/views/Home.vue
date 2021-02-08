<template>
  <main class="home">
    <div class="hero">
      <img class="logo" alt="Social.gg logo" src="../assets/logo.svg" />
      <h1>Great content for your game night with friends</h1>
    </div>
    <section class="statistics">
      <div class="stats">
        <!-- TODO: Make numbers dynamic -->
        <div class="number">
          <div class="int" id="num-of-decks">156</div>
          <div class="legend">Decks</div>
        </div>
        <div class="number">
          <div class="int" id="num-of-cards">6240</div>
          <div class="legend">Playing cards</div>
        </div>
        <div class="number">
          <div class="int" id="num-of-games">12</div>
          <div class="legend">Games</div>
        </div>
      </div>
      <p>created by our users <img width="14" height="17" src="../assets/icons/text-heart.svg" alt="Heart icon"></p>
    </section>
    <game-list></game-list>
  </main>
</template>

<script>
// @ is an alias to /src
import GameList from '@/components/GameList';

export default {
  components: { GameList },
  methods: {
    numberWithSpaces(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
    },
    easeOut(x) {
      return 1 - Math.pow(1 - x, 3.5);
    },
    animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = this.easeOut(Math.min((timestamp - startTimestamp) / duration, 1));
        obj.innerHTML = this.numberWithSpaces(Math.ceil(progress * (end - start) + start));
        obj.style.opacity = progress;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    },
  },
  mounted() {
    [ "num-of-decks",
      "num-of-cards",
      "num-of-games"].forEach(function (value) {
        let obj = document.getElementById(value);
        let endOn = parseInt(obj.innerText);
        this.animateValue(obj, 0, endOn, 3300);
    }, this);
  }
}
</script>

<style scoped>
.statistics {
  text-align: center;
  margin-top: 24px;
}

.stats {
  display: inline-flex;
  margin: 0 auto;
}

.statistics p {
  color: #fff;
  text-align: center;
}

.statistics p img {
  vertical-align: text-top;
}

.number {
  margin: 0 12px;
}

.number .int {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.number .legend {
  margin-top: 6px;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #FFFFFF;
  opacity: 0.7;
}

.hero {
  position: relative;
  overflow: hidden;

  padding: 64px 0;
}

.hero * {
  position: relative;
  z-index: 2;
}

.hero:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: .33;
  background-image: url('../assets/images/toa-heftiba-l_ExpFwwOEg-unsplash.jpg');
  background-repeat: no-repeat;
  background-position-y: 64%;
  background-size: cover;
}

</style>