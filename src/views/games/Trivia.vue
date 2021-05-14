<template>
  <div class="game trivia">
    <header class="top">
      <img class="game-icon" width="50" height="50" :alt="$t('qna icon')" src="@/assets/icons/game-icon-qna.svg">
      <h1>{{ $t('Trivia') }}</h1>
      <h4>{{ $t('Questions and answers') }}</h4>
    </header>
    <ExpandableSection>
      <h2>{{ $t('How to play') }}</h2>
      <MartDown>{{ $t('trivia_how-to-play_description') }}</MartDown>
      <h2>{{ $t('What you need') }}</h2>
      <MartDown>{{ $t('trivia_what-you-need_description') }}</MartDown>
    </ExpandableSection>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'
import ExpandableSection from '@/components/ExpandableSection'
import MartDown from '../../components/MartDown.vue'

export default {
  components: { 
    ListDecks,
    ExpandableSection,
    MartDown,
  },

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