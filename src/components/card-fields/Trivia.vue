<template>
  <div>
    <label for="question"><h3>Question</h3></label>
    <textarea name="question" id="question" rows="3" placeholder="Question" v-model="buffer.question" @input="$emit('input', buffer)"></textarea>
    <label for="answer"><h3>Answer</h3></label>
    <textarea name="answer" id="answer" rows="3" placeholder="Answer" v-model="buffer.answer" @input="$emit('input', buffer)"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          question: "",
          answer: "",
        }
      },
    },
  },
  data() {
    return {
      buffer: Object.assign({}, this.value)
    }
  },
  watch: {
    value: {
      handler() {
        this.buffer = Object.assign({}, this.value)
      },
      deep: true,
    },
  },
}
</script>

<style>

</style>