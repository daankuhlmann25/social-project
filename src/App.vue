<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Party Games', params: { gameName: 'song-battle' } }">Party games</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import url("./assets/css/style.css");
</style>