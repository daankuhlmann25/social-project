<template>
  <header>
    <div class="header-wrap">
      <a class="left" v-show="!hideLeft" @click="$router.go(-1)"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" :alt="$t('Back arrow icon')">{{ $t('Back') }}</a>
      <localized-link to="/" class="logo"><img class="logo" :alt="$t('Social.gg logo')" width="34" height="34" src="@/assets/logo.svg" /></localized-link>
      <a class="right" v-if="right === 'gameList'" v-on:click="toggleGameList"><img src="@/assets/icons/all-games.svg" width="16" height="17" :alt="$t('All games icon')">{{ $t('All games') }}</a>
      <a class="right" v-else-if="right === 'howToPlay'" v-on:click="toggleHowToPlay">{{ $t('How to play') }}</a>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapState({
      hideLeft: state => state.header.hideLeft,
      right: state => state.header.right,
      transparent: state => state.header.transparent,
    }),
  },
  
  methods: {
    ...mapMutations({
      toggleGameList: 'header/toggleGameList',
      toggleHowToPlay: 'header/toggleHowToPlay',
      setRight: 'header/setRight',
      setHideLeft: 'header/setHideLeft',
      setTransparent: 'header/setTransparent',
    }),

    makeTransparent() {
      this.$el.style.backdropFilter =
      this.$el.style.webkitBackdropFilter = "blur(0px)"
      this.$el.style.backgroundColor = "rgba(53, 50, 61, 0)"
    },

    clearElStyle() {
      this.$el.style = ""
    },
  
    handleScroll() {
      //Scrolled to top
      if (window.scrollY < 1)
        this.makeTransparent()
      else
        this.clearElStyle()
    },
  },

  mounted() {
    if (this.transparent) {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    }
  },

  watch: {
    '$store.state.header.transparent': function() {
      if(this.$store.state.header.transparent) {
        window.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }
      else {
        window.removeEventListener('scroll', this.handleScroll)
        this.clearElStyle()
      }
    }
  },
  
  destroyed: function () {
    if (this.transparent)
      window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>

</style>
