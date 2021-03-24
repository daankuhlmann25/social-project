<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'forward',
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'back' : 'forward'
    }
  },
}
</script>

<style>
@import url("./assets/css/style.css");

.fade-enter-active,
.fade-leave-active,
.forward-enter-active,
.forward-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 250ms cubic-bezier(.55,0,.1,1);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.forward-enter,
.back-leave-active {
  opacity: 0;
  -webkit-transform: translateX(16px);
  transform: translateX(16px);
}
.forward-leave-active,
.back-enter {
  opacity: 0;
  -webkit-transform: translateX(-16px);
  transform: translateX(-16px);
}
</style>