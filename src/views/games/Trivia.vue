<template>
  <div class="game trivia">
    <header class="top">
      <img class="game-icon" width="50" height="50" alt="music icon" src="@/assets/icons/game-icon-qna.svg">
      <h1>Trivia</h1>
      <h4>Questions and answers</h4>
    </header>
    <ExpandableSection>
      <h2>How to play</h2>
      <p>You take turns answering questions. If your answer is correct, you gain one point and get to answer another question.</p>
      <p>If you get it wrong, it’s the next persons turn.</p>
      <h2>What you need</h2>
      <ul>
        <li>Pen & paper (for counting points)</li>
      </ul>
    </ExpandableSection>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'
import ExpandableSection from '@/components/ExpandableSection'

export default {
  components: { ListDecks, ExpandableSection },

  created() {
    this.$store.commit('header/setTransparent', true)
  },
}
</script>

<style scoped>
header.top::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .03;
  background-image: url('../../assets/images/white-noise.png');
  background-repeat: repeat;
  background-position: center;
  pointer-events: none;
}
</style>