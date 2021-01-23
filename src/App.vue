<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Games' }">Games</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import url("./assets/css/style.css");
</style>