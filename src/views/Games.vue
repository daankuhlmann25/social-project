<template>
    <main class="games">
        <header>
            <a :href="prevRoute" @click="$router.go(-1)">Back</a>
            <router-link to="/"><img class="logo" alt="Social.gg logo" src="../assets/logo.svg" /></router-link>
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
            prevRoute: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from.path
        })
    },
}
</script>

<style scoped>

</style>