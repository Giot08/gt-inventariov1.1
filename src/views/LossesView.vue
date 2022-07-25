<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Reportes de inventario"
  />
  <a-table
    bordered
    :columns="inventoryStore.reportTable"
    :data-source="inventoryStore.storage_reg">

  </a-table>
</template>

<script setup>
//Stores '@/db'
import { useInventoryStore } from "@/db/inventory";
//AntD

const inventoryStore = useInventoryStore();
</script>