<template>
  <div>
    <label for="artist"><h3>{{ $t('Artist') }}</h3></label>
    <input type="text" name="artist" id="artist" :placeholder="$t('Artist name')" v-model.trim="buffer.artist" @input="$emit('input', buffer)">
    <label for="song"><h3>{{ $t('Song') }}</h3></label>
    <input type="text" name="song" id="song" :placeholder="$t('Song name')" v-model.trim="buffer.song" @input="$emit('input', buffer)">
    <label for="youSing"><h3>{{ $t('You sing') }}</h3></label>
    <textarea name="youSing" id="youSing" rows="2" :placeholder="$t('Lyrics')" v-model.trim="buffer.youSing" @input="$emit('input', buffer)"></textarea>
    <label for="theySing"><h3>{{ $t('They sing') }}</h3></label>
    <textarea name="theySing" id="theySing" rows="2" :placeholder="$t('Lyrics')" v-model.trim="buffer.theySing" @input="$emit('input', buffer)"></textarea>
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