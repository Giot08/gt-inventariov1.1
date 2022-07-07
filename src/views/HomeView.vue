<template>
  <div>
    <HeaderComponent />
    <LoginComponent v-if="!userLog" />
    <LogedComponent v-else />
  </div>
</template>

<script setup>
//Vue
import { computed } from "vue";
//Stores '@/db'
import { useAuthStore } from "@/db/auth";
//Components
import HeaderComponent from "@/components/HeaderComponent.vue";
import LoginComponent from "@/components/home/LoginComponent.vue";
import LogedComponent from "@/components/home/LogedComponent.vue";

//Al trabajar con script setup hay que importar la prop computed para que sea reactivo
const userLog = computed(() => {
  return useAuthStore().isLoggedIn;
});
</script>
