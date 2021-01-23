<template>
    <div class="game song-battle">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <img class="logo" alt="Social.gg logo" src="../../assets/logo.svg" />
            <a href="#">All games</a>
        </header>
        <h1>{{$route.name}}</h1>
        <h2>How to play</h2>
        <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
        <p>Pass the phone to the other team and let them go to the next card.</p>
    </div>
</template>


<script>
export default {

}
</script>

<style scoped>

</style>