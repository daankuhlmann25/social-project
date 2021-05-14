<template>
  <transition>
    <div class="card">
      
      <div class="song">
        <span class="icon"><img src="@/assets/icons/music-note.svg" width="28" height="28" :alt="$t('Music note icon')"></span>
          <div class="song-container">
              <span class="song-title"><slot name="song">{{ $t('Song name') }}</slot></span>
              <span class="song-artist">{{ $t('By:') }} <slot name="artist">{{ $t('Artist name') }}</slot></span>
          </div>
      </div>

      <hr>

      <div class="container-spacer">
        <div class="legend">{{ $t('You sing') }}:</div>
        <div id="you-sing" ref="youSing"><slot name="youSing">{{ $t('Lyrics') }}</slot></div>
      </div>

      <div class="container-spacer">
        <div class="legend">{{ $t('They sing') }}:</div>
        <div id="they-sing" ref="theySing"><slot name="theySing">{{ $t('Lyrics') }}</slot></div>
      </div>

      <span class="number-of-cards">
        <slot name="currentCard">0</slot> / <slot name="numberOfCards">0</slot>
      </span>
    
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    fixHtml() {
      if (typeof this.$slots.youSing == "string" && this.$slots.youSing.length)
        this.$refs.youSing.innerHTML = this.$slots.youSing
      else if (typeof this.$slots.youSing == "object" && this.$slots.youSing[0] && this.$slots.youSing[0].text.length)
        this.$refs.youSing.innerHTML = this.$slots.youSing[0].text
      
      if (typeof this.$slots.theySing == "string" && this.$slots.theySing.length)
        this.$refs.theySing.innerHTML = this.$slots.theySing
      else if (typeof this.$slots.theySing == "object" && this.$slots.theySing[0] && this.$slots.theySing[0].text.length)
        this.$refs.theySing.innerHTML = this.$slots.theySing[0].text
    },
  },
  mounted() {
    this.fixHtml()
  },
  async updated() {
    await this.fixHtml()
    if (this.$parent.playCardUpdated)
      this.$parent.playCardUpdated(this)
  },
}
</script>

<style>

</style>