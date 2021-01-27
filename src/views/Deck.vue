<template>
    <div class="deck">
        <small>Song battle</small>
        <h1>Songs you sing in the shower</h1>
        <p>Description of this deck goes here.</p>
        <router-link :to="{ name: 'Play', params: {deckId: 1} }">Play</router-link>
    </div>
</template>


<script>
export default {

}
</script>

<style scoped>

</style>