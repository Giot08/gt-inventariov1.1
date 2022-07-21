<template>
  <div>
    <a-collapse style="min-width: 90vw" accordion>
      <a-collapse-panel
        v-for="(container, index) in custom.container"
        :key="index"
        :header="container.label"
      >
        <a-spin 
        delay="3000"
        v-show="container.data == 0"
        style="display: flex; justify-content: center; align-items: center; margin: 1rem; gap: 1em;"  
        tip="Cargando"  
        />

          <a-input
            v-model:value="container.model"
            allowClear
            :type="container.type"
            required
            :placeholder="container.placeholder"
            style="width: 90%"
          />

          <a-button @click="custom.addItem(`${container.arg}`)" type="primary"
            >Añadir</a-button
          >
        <a-table
          bordered
          :columns="container.columns"
          :data-source="container.data"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'borrar'">
              <a-popconfirm
                title="¿Seguro deseas borrar este item?"
                @confirm="custom.deleteItem(record.id, `${container.arg}`)"
              >
                <a-button danger type="primary">Borrar</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup>
// Stores
import { useCustomStore } from "@/db/custom";

const custom = useCustomStore();
</script>
<style scoped>
</style>