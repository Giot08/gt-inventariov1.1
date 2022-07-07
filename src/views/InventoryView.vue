
<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Inventario" />
    <a-table bordered :columns="inventoryStore.columns" :data-source="inventoryStore.inventario">
      <!-- El Record es la iteracion del bucle a renderizar, 
        column en la posicion donde se cambiaran los datos a inyectar -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'borrar'">
          <a-popconfirm title="¿Seguro deseas borrar este producto?" @confirm="inventoryStore.delProduct(record.id, `Bodega ${record.bodega}`)">
            <a-button danger type="primary">Borrar</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
//Vue
import { onMounted } from 'vue'
//Stores '@/db'
import { useInventoryStore } from '@/db/inventario'
//Firebase

const inventoryStore = useInventoryStore()

onMounted(() => {
  inventoryStore.montar()
})


</script>
<style scoped>
table {
  margin-right: 10px;
}
</style>