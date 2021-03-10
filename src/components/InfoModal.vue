<template>
  <transition name="modal">
    <div class="modal info">
      <div class="dialog info">
        <a @click="$emit('close')" class="close"><img alt="Close" src="@/assets/icons/close.svg"/></a>
        <h2 class="white"><slot name="heading">Header</slot></h2>
        <section class="body"><slot name="body">Body text</slot></section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>