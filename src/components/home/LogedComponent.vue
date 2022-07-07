<template>
  <div>
    <h2>
      Bienvenido
      <span>{{emailUser}}</span>
    </h2>
    <h3>GT-Inventario v.1.1.0</h3>
    <h3>Problemas con la app enviar correo <a href="mailto:xgiot08@gmail.com"> aqui</a></h3>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/db/auth';

const emailUser = computed(() => {
  return useAuthStore().email;
});
</script>

<style>

</style>