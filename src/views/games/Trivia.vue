<template>
  <div class="game trivia">
    <hgroup>
      <h1>Trivia</h1>
      <h4>Questions and answers</h4>
    </hgroup>
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
}
</script>

<style scoped>

</style>