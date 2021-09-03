<template>
  <div class="game sing-together">
    <header class="top">
      <img class="game-icon" width="50" height="50" :alt="$t('music icon')" src="@/assets/icons/game-icon-music.svg">
      <h1>{{ $t('Sing together') }}</h1>
      <h4>{{ $t('Team up, finish the lyrics') }}</h4>
    </header>
    <ExpandableSection>
      <h2>{{ $t('How to play') }}</h2>
      <MartDown>{{ $t('sing-together_how-to-play_description') }}</MartDown>
    </ExpandableSection>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'
import ExpandableSection from '@/components/ExpandableSection'
import MartDown from '@/components/MartDown'

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