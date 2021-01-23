<template>
    <main class="games">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <router-link to="/"><img class="logo" alt="Social.gg logo" src="../assets/logo.svg" /></router-link>
            <a v-on:click="show = !show">All games</a> <!-- TODO: Make it show game-list by adding class show to .game-list -->
        </header>
        <game-list v-bind:class="{ show: show }"></game-list>
        <router-view />
    </main>
</template>

<script>
import GameList from './GameList.vue'

export default {
    components: { GameList },
}
</script>

<style scoped>

</style>