<template>
    <a-collapse style="min-width: 800px;" v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="5" :header="custom.productclass.label">
            <div>
                <a-label for="productclass">{{ custom.productclass.label }}</a-label>
                <a-input id="productclass" :v-model="custom.productclass.model" required />
            </div>



        </a-collapse-panel>
    </a-collapse>
    <p>{{ custom.container[0].data }}</p>
</template>

<script setup>
//Vue
import { onMounted } from 'vue';
// Stores
import { useCustomStore } from '@/db/custom';

const custom = useCustomStore();
onMounted(() => {
    custom.getAllDatas();
});
</script>

<style>
</style>