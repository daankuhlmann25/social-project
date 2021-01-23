<template>
    <div class="games">
        <router-link :to="{ name: 'Song battle' }">Song battle</router-link><br />
        <router-link :to="{ name: 'Trivia' }">Trivia</router-link>
        <router-view />
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$route.params);
    }
}
</script>

<style scoped>

</style>