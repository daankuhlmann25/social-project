<template>
  <div>
    <label for="artist"><h3>Artist</h3></label>
    <input type="text" name="artist" id="artist" placeholder="Artist name" v-model="buffer.artist" @input="$emit('input', buffer)">
    <label for="song"><h3>Song</h3></label>
    <input type="text" name="song" id="song" placeholder="Song name" v-model="buffer.song" @input="$emit('input', buffer)">
    <label for="youSing"><h3>You sing</h3></label>
    <textarea name="youSing" id="youSing" rows="3" placeholder="Lyrics" v-model="buffer.youSing" @input="$emit('input', buffer)"></textarea>
    <label for="theySing"><h3>They sing</h3></label>
    <textarea name="theySing" id="theySing" rows="3" placeholder="Lyrics" v-model="buffer.theySing" @input="$emit('input', buffer)"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          artist: "",
          song: "",
          youSing: "",
          theySing: "",
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