<template>
  <transition>
    <div class="card">
      
      <div class="song">
        <span class="icon"><img src="@/assets/icons/music-note.svg" width="28" height="28" alt="Music note icon"></span>
          <div class="song-container">
              <span class="song-title"><slot name="song">Song name</slot></span>
              <span class="song-artist">By: <slot name="artist">Artist name</slot></span>
          </div>
      </div>

      <hr>

      <div class="container-spacer">
        <div class="legend">YOU SING:</div>
        <div id="you-sing" ref="youSing"><slot name="youSing">Lyrics</slot></div>
      </div>

      <div class="container-spacer">
        <div class="legend">THEY SING:</div>
        <div id="they-sing" ref="theySing"><slot name="theySing">Lyrics</slot></div>
      </div>

      <span class="number-of-cards">
        <slot name="currentCard">0</slot> / <slot name="numberOfCards">0</slot>
      </span>
    
    </div>
  </transition>
</template>

<script>
export default {
  mounted() {
    this.$refs.youSing.innerHTML  = typeof this.$slots.youSing == "string" ? this.$slots.youSing : this.$slots.youSing[0].text
    this.$refs.theySing.innerHTML = typeof this.$slots.theySing == "string" ? this.$slots.theySing : this.$slots.theySing[0].text
  },
}
</script>

<style>

</style>