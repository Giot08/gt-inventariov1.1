<template>
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Personalizar productos" />
  <CustomizeComponent />
  <ProductClassComponent />
</template>

<script setup>
import CustomizeComponent from '@/components/custom/CustomizeComponent.vue';
import ProductClassComponent from '@/components/custom/ProductClassComponent.vue';
</script>

<style>
</style>