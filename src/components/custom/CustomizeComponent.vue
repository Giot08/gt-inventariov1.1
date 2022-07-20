<template>
    <div>
        <a-collapse style="min-width: 800px;" accordion>
            <a-collapse-panel v-for="(container, index) in custom.container" :key="index" :header="container.label">
                <a-input v-model:value="container.model" allowClear :type="container.type" required
                    :placeholder="container.placeholder" />
                <div class="right">
                    <a-button @click="custom.addItem(`${container.arg}`)" type="primary">Añadir</a-button>
                </div>
                <a-table bordered :columns="container.columns" :data-source="container.data">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'borrar'">
                            <a-popconfirm title="¿Seguro deseas borrar este item?"
                                @confirm="custom.deleteItem(record.id, `${container.arg}`)">
                                <div class="right">
                                    <a-button danger type="primary">Borrar</a-button>
                                </div>
                            </a-popconfirm>
                        </template>
                    </template>
                </a-table>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script setup>
//Vue
import { onMounted } from 'vue';
// Stores
import { useCustomStore } from '@/db/custom';


const custom = useCustomStore()

onMounted(() => {
    custom.getAllDatas();
});
</script>