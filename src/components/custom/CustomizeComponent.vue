<template>
    <div>

        <a-collapse accordion>
            <a-collapse-panel v-for="(container, index) in container" :key="index" :header="container.label">
                <a-input v-model:value="container.model" allowClear :type="container.type" required :placeholder="container.placeholder" />
                <a-button type="primary">Añadir</a-button>
                <a-colapse-panel>
                    <a-table>
                    </a-table>
                </a-colapse-panel>
            </a-collapse-panel>
        </a-collapse>

        <p>{{customData}}</p>
    </div>
</template>
<script setup>
//Vue
import { onMounted } from 'vue';
// Stores
import { useCustomStore } from '@/db/custom';



const container = useCustomStore().container;
const customData = useCustomStore().data;
onMounted(() => {

    return {
        container, customData
    }
});
</script>