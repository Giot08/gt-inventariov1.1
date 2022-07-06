<template>
  <div class="fix">
    <HeaderComponent />
    <LoginComponent />

    
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
// import LoginComponent from "@/components/home/LoginComponent.vue";

export default ({
  name: "HomeView",
  components: {
    HeaderComponent,
    //LoginComponent,
  },
});
</script>

<style scoped>
.auth-button {
  display: flex;
  width: 100%;
  justify-content: end;
}
.fix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
