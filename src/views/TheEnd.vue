<template>
  <div class="the-end">
    <lottie-animation
      ref="theEnd"
      :animationData="require('@/assets/animations/the-end.json')"
      style="width:40%;
        height: 40%;
        margin: 0px auto;
        background-color: rgba(0,0,0,.15);
        border-radius: 50%;
        margin-bottom: 24px;"
      :speed="0.5"
      :autoPlay="false"
      @enterFrame="enterFrame"
    />
    <hgroup>
      <h5>All done!</h5>
      <h1>You have reached the end of <span>{{$route.params.deckId}}</span></h1>
    </hgroup>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'
import LottieAnimation from 'lottie-web-vue'

export default {
  components: { ListDecks, LottieAnimation },
  
  data() {
    return {
      showGameList: false,
    }
  },
  methods: {
    enterFrame() {
      if (this.$refs.theEnd.anim.currentFrame > 64)
        this.$refs.theEnd.pause()
    }
  },
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'gameList')
  },
  mounted() {
    setTimeout(() => { 
      this.$refs.theEnd.play() 
    }, 500);
  }
}
</script>

<style scoped>

</style>