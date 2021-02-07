<template>
    <main class="deck">
        <header-comp></header-comp>
        <game-list v-bind:class="{ show: show }"></game-list>
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