<template>
    <main class="deck">
        <HeaderComp></HeaderComp>
        <GameList v-bind:class="{ show: show }"></GameList>
        <small>Sing together</small>
        <h1>Songs you sing in the shower</h1>
        <p>Description of this deck goes here.</p>
        <router-link :to="{ name: 'Play', params: {id: 1} }">Play</router-link>
    </main>
</template>


<script>
import GameList from '@/components/GameList'
import HeaderComp from '@/components/Header'

export default {
    components: { GameList, HeaderComp },
    data() {
        return {
            show: false,
        }
    }
}
</script>

<style scoped>

</style>