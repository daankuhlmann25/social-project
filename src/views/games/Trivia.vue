<template>
    <div class="game song-battle">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <img class="logo" alt="Social.gg logo" src="../../assets/logo.svg" />
            <a href="#">All games</a>
        </header>
        <h1>{{$route.params.gameName}}</h1>
        <h2>How to play</h2>
        <p>You take turns answering questions. If your answer is correct, you gain one point and get to answer another question.</p>
        <p>If you get it wrong, it’s the next persons turn.</p>
        <h2>What you need</h2>
        <li>
            <ul>Pen & paper (for counting points)</ul>
        </li>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>

</style>