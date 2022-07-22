<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Administración de inventarios"
  />
  <div v-if="inventoryStore.products.length == 0">
    <a-spin
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        gap: 1em;
        font-weight: 600;
      "
      tip="Cargando"
    />
  </div>
  <div>
    <a-table
    bordered
    :columns="inventoryStore.inventoryTable"
    :data-source="inventoryStore.products"
  >
    <!-- El Record es la iteracion del bucle a renderizar, 
        column en la posicion donde se cambiaran los datos a inyectar -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'edit'">
        <div class="editFlex">
          <a-button
            @click="
              inventoryStore.modifyStock(
                'Retirado',
                record.storage,
                record.id,
                record.name,
                record.stock,
                record.medition,
                record.modelStock
              )
            "
            type="primary"
            danger
          >
            <template #icon><MinusSquareOutlined /></template>
          </a-button>
          <a-input
            class="numberInput"
            type="number"
            size="small"
            placeholder="0"
            v-model:value="record.modelStock"
            style="width: 50px !important; text-align: center"
          />
          <a-button
            @click="
              inventoryStore.modifyStock(
                'Ingresado',
                record.storage,
                record.id,
                record.name,
                record.stock,
                record.medition,
                record.modelStock
              )
            "
            type="primary"
            style="background-color: #52c41a"
          >
            <template #icon><PlusSquareOutlined /></template>
          </a-button>
        </div>
      </template>
      <template v-if="column.dataIndex === 'delete'">
        <a-popconfirm
          title="¿Seguro deseas borrar este producto?"
          @confirm="
            inventoryStore.deleteProductFromStorage(record.id, record.storage)
          "
        >
          <a-button danger type="primary">Borrar</a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  </div>
</template>

<script setup>
//Stores '@/db'
import { useInventoryStore } from "@/db/inventory";
//AntD
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons-vue";
const inventoryStore = useInventoryStore();
</script>
<style scoped>
.numberInput::-webkit-inner-spin-button,
.numberInput::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  max-width: 90px;
}
.editFlex {
  display: flex;
  justify-content: space-between;
}
table {
  margin-right: 10px;
}
</style>ñ