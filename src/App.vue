<template>
  <div class="screen-fix bg">
    <NavbarComponent/>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import NavbarComponent from './components/NavbarComponent.vue';


</script>

<style scoped>
.screen-fix{
  display: flex;
}
.bg{
  background-color: #F7F7F7;
  min-height: 100vh;
}
.center{
  margin: 0 auto;
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
