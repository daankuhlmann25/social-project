<template>
  <div id="game-list" v-bind:class="{ show: show }">
    <div class="game-list">
      <a v-on:click="show = !show" class="close">
        <img alt="" src="../assets/icons/close.svg" />
      </a>
      <div class="games-group">
        <!-- TODO: make dynamic -->
        <h2>Party games</h2>
        <ul>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-music.svg" />
            <div class="game-info">
              <span class="title">Song battle</span>
              <span class="subtitle">Finish the lyrics, sing together</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Trivia' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-qna.svg" />
            <div class="game-info">
              <span class="title">Trivia</span>
              <span class="subtitle">Questions and answers</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-qna.svg" />
            <div class="game-info">
              <span class="title">Quiz</span>
              <span class="subtitle">Description</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-body.svg" />
            <div class="game-info">
              <span class="title">Charades</span>
              <span class="subtitle">No words, say it with your body</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-words.svg" />
            <div class="game-info">
              <span class="title">Fictionary</span>
              <span class="subtitle">Guess the definition of obscure words</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-words.svg" />
            <div class="game-info">
              <span class="title">30 seconds</span>
              <span class="subtitle">Describe the word without using it</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-words.svg" />
            <div class="game-info">
              <span class="title">20 questions</span>
              <span class="subtitle">Only answers allowed: “Yes” and “No”</span>
            </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Song battle' }">
            <img class="game-icon" alt="" src="../assets/icons/game-icon-words.svg" />
            <div class="game-info">
              <span class="title">Don't say yes</span>
              <span class="subtitle">Never mention the forbidden words</span>
            </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="games-group">
        <h2>Drinking games</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </div>
      <div class="games-group">
        <h2>Conversation games</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
        return {
            show: false,
        }
  }
};
</script>

<style scoped>

</style>