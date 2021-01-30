<template>
    <main class="edit-deck">
        <header>
            <a @click="$router.go(-1)">Back</a>
            <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="../assets/logo.svg" /></router-link>
        </header>
        <small>Sing together</small>
        <h1>{{$route.name}}</h1>
        <h2>Name <span>0/40</span></h2>
        <input type="text" name="deck-name" id="deck-name" maxlength="40">
        <h2>Cards</h2>
        <h2>Your name <span>Public</span></h2>
        <input type="text" name="name" id="name">
        <h2>E-mail <span>Not public</span></h2>
        <input type="email" name="email" id="email">
        <h2>E-mail <span>Not public</span></h2>
        <textarea name="message" id="message" cols="30" rows="10"></textarea>
        <input type="submit" value="Save">
        <p>We would love you to share your fantastic deck with all our fellow players!</p>
        <p>When you feel happy with your creation, please publish it.</p>
        <button type="submit">Publish on social.gg</button>
        <router-view />
    </main>
</template>

<script>
export default {
    data() {
        return {
            gameId: Number,
            deckId: Number,
        }
    },
}
</script>

<style scoped>

</style>