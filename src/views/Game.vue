<template>
    <div class="game">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <img class="logo" alt="Social.gg logo" src="../assets/logo.svg" />
            <a href="#">All games</a>
        </header>
        <h1>{{$route.params.gameName}}</h1>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route);
    }
}
</script>

<style scoped>

</style>