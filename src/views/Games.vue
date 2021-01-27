<template>
    <main class="games">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="../assets/logo.svg" /></router-link>
            <a v-on:click="show = !show">All games</a>
        </header>
        <game-list v-bind:class="{ show: show }"></game-list>
        <router-view />
    </main>
</template>

<script>
import GameList from './GameList.vue'

export default {
    components: { GameList },
    data() {
        return {
            show: false,
        }
    }
}
</script>

<style scoped>

</style>