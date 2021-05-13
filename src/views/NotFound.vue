<template>
  <main class="NotFound">
    <Header right="gameList" />
    <GameList v-bind:class="{ show: showGameList }" />
    <h1>{{ $t('Page not found') }}</h1>
  </main>
</template>

<script>
import GameList from '@/components/GameList'
import Header from '@/components/Header'

export default {
    components: { GameList, Header },
    data() {
        return {
            showGameList: false,
        }
    }
}
</script>

<style scoped>

</style>