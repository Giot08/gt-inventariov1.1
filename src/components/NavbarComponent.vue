<template>
  <div style="max-width: 256px; margin-right: 15px;">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
    >
      <a-menu-item @click="toggleCollapsed" key="0">
        <template #icon>
          <ArrowRightOutlined v-if="collapsed" />
          <ArrowLeftOutlined v-else />
        </template>
      </a-menu-item>

      <a-menu-item key="1">
        <template #icon>
          <HomeFilled />
        </template>
        <span>Inicio</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Inventario</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <ToolFilled />
        </template>
        <span>Perzonalizar</span>
      </a-menu-item>
      <a-menu-item key="4">
        <template #icon>
          <ShoppingCartOutlined />
        </template>
        <span>Ingresos y Retiros</span>
      </a-menu-item>
      <a-menu-item key="5">
        <template #icon>
          <FallOutlined />
        </template>
        <span>Mermas</span>
      </a-menu-item>
      <a-menu-item key="5">
        <a-button v-if="!collapsed" type="primary" danger>Logout</a-button>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import {
  HomeFilled,
  ToolFilled,
  DesktopOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  FallOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    HomeFilled,
    ToolFilled,
    DesktopOutlined,
    ShoppingCartOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    FallOutlined,
  },

  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return { ...toRefs(state), toggleCollapsed };
  },
});
</script>
