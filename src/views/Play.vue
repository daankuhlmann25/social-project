<template>
    <main class="play">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="../assets/logo.svg" /></router-link>
            <a v-on:click="show = !show">How to play</a>
        </header>
        <router-view />
    </main>
</template>

<script>

export default {
    data() {
        return {
            show: false,
        }
    }
}
</script>

<style scoped>

</style>