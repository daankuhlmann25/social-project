<template>
  <main class="NotFound">
    <HeaderComp />
    <GameList v-bind:class="{ show: showGameList }"></GameList>
    <h1>Page not found</h1>
  </main>
</template>

<script>
import GameList from '@/components/GameList'
import HeaderComp from '@/components/Header'

export default {
    components: { GameList, HeaderComp },
    data() {
        return {
            showGameList: false,
        }
    }
}
</script>

<style scoped>

</style>