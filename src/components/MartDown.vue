<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { parseMartDown } from "@/helpers/martdown.js"

export default {
  mounted() {
    this.$el.innerHTML = parseMartDown(this.$el.innerHTML)
  }
}
</script>