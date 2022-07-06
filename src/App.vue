<template>
  <div class="bg">
    <NavbarComponent class="navbar" />
    <div class="fix">

      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
</script>

<style scoped>
.navbar {
  position: absolute;
  z-index: 100;
  top: 0;
}
.bg {
  background-color: #f7f7f7;
  min-height: 100vh;
}
.fix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
