<template>
    <div>

        <a-collapse accordion>
            <a-collapse-panel v-for="(container, index) in container" :key="index" :header="container.label">
                <a-input v-model:value="container.model" allowClear :type="container.type" required
                    :placeholder="container.placeholder" />
                <a-button @click="custom.addItem(`${container.arg}`)" type="primary">Añadir</a-button>

                <a-table bordered :columns="container.columns" :data-source="container.data">
                    <!-- El Record es la iteracion del bucle a renderizar, 
        column en la posicion donde se cambiaran los datos a inyectar -->
                    <!-- 

            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'borrar'">
                    <a-popconfirm title="¿Seguro deseas borrar este producto?"
                                @confirm="inventoryStore.delProduct(record.id, `Bodega ${record.bodega}`)">
                                <a-button danger type="primary">Borrar</a-button>
                            </a-popconfirm>
                        </template>
                    </template>
         -->
                </a-table>
            </a-collapse-panel>
        </a-collapse>

        <p>{{ container[1] }}</p>
        <!-- <p>{{ container[0].model }}</p> -->
    </div>
</template>
<script setup>
//Vue
import { onMounted } from 'vue';
// Stores
import { useCustomStore } from '@/db/custom';


const custom = useCustomStore()
const container = useCustomStore().container;
onMounted(() => {
    custom.getAllDatas();
});
</script>