<template>
    <main class="play">
        <header>
            <a class="left" @click="$router.go(-1)">Back</a>
            <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="../assets/logo.svg" /></router-link>
            <a class="right" v-on:click="showHowToPlay = !showHowToPlay">How to play</a>
        </header>
        <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
        <router-view />
    </main>
</template>

<script>
import HowToPlay from '@/components/HowToPlay'

export default {
    components: { HowToPlay },
    data() {
        return {
            showHowToPlay: false,
        }
    }
}
</script>

<style scoped>

</style>