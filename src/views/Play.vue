<template>
    <main class="play">
        <Header right="howToPlay"></Header>
        <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
        <router-view />
    </main>
</template>

<script>
import HowToPlay from '@/components/HowToPlay'
import Header from '@/components/Header'

export default {
    components: { HowToPlay, Header },
    data() {
        return {
            showHowToPlay: false,
        }
    }
}
</script>

<style scoped>

</style>