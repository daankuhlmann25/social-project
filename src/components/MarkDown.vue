<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { parseMarkDown } from "@/helpers/markdown.js"

export default {
  mounted() {
    this.$el.innerHTML = parseMarkDown(this.$el.innerHTML)
  }
}
</script>