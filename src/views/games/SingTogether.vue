<template>
  <div class="game sing-together">
    <hgroup>
      <h1>Sing together</h1>
      <h4>Team up, finish the lyrics</h4>
    </hgroup>
    <ExpandableSection>
      <h2>How to play</h2>
      <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
      <p>Pass the phone to the other team and let them go to the next card.</p>
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