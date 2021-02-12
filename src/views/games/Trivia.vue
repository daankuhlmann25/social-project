<template>
  <div class="game trivia">
    <hgroup>
      <h1>Trivia</h1>
      <h4>Questions and answers</h4>
    </hgroup>
    <section class="how-to-play-section">
    <h2>How to play</h2>
      <p>You take turns answering questions. If your answer is correct, you gain one point and get to answer another question.</p>
      <p>If you get it wrong, it’s the next persons turn.</p>
      <h2>What you need</h2>
      <ul>
        <li>Pen & paper (for counting points)</li>
      </ul>
    </section>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'

export default {
  components: { ListDecks },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>

</style>