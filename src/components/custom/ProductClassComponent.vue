<template>
  <div>
    <a-collapse style="min-width: 90vw" accordion>
      <a-collapse-panel key="5" :header="custom.productclass.label">
        <a-spin
          delay="3000"
          v-show="custom.productclass.table.data == 0"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem;
            gap: 1em;
          "
          tip="Cargando"
        />
        <a-input
          allowClear
          style="min-width: 100%"
          id="productclass"
          v-model:value="custom.product.name"
          required
        />
        <div style="min-width: 100%" class="productPanel">
          <a-select
            v-model:value="custom.product.category"
            style="width: 33%"
            required
          >
            <a-select-option
              v-for="item in custom.container[1].data"
              :key="item"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>

          <a-select
            v-model:value="custom.product.subcategory"
            style="width: 33%"
            required
          >
            <a-select-option
              v-for="item in custom.container[2].data"
              :key="item"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>

          <a-select
            v-model:value="custom.product.medition"
            style="width: 33%"
            required
          >
            <a-select-option
              v-for="item in custom.container[3].data"
              :key="item"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-button type="primary" @click="custom.addProduct()">
            Añadir</a-button
          >
        </div>
        <a-table
          bordered
          :columns="custom.productclass.table.columns"
          :data-source="custom.productclass.table.data"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'borrar'">
              <a-popconfirm
                title="¿Seguro deseas borrar este item?"
                @confirm="custom.deleteItem(record.id, 'productClass')"
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
.productPanel {
  display: flex;
  justify-content: space-between;
}
</style>