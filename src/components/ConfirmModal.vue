<template>
  <transition name="modal">
    <div class="modal confirm">
      <div class="dialog confirm">
        <h2 class="white"><slot name="heading">Are you sure?</slot></h2>
        <p><slot name="body">Please confirm or cancel.</slot></p>
        <div class="button-group">
          <button type="button" @click="$emit('confirm')" class="confirm-button"><slot name="confirm">Confirm</slot></button>
          <button type="button" @click="$emit('cancel')" class="cancel-button"><slot name="cancel">Cancel</slot></button>
        </div>
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