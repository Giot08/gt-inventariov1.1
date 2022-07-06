<template>
  <div style="max-width: 256px; margin-right: 15px">
    <a-menu
    v-if="userlog"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      :inline-collapsed="!collapsed"
    >
      <a-menu-item @click="toggleCollapsed" key="0">
        <template #icon>
          <ArrowRightOutlined v-if="!collapsed" />
          <ArrowLeftOutlined v-else />
        </template>
      </a-menu-item>

      <a-menu-item v-if="collapsed" key="1">
        <template #icon>
          <HomeFilled />
        </template>
        <router-link to="/">Inicio</router-link>
      </a-menu-item>
      <a-menu-item v-if="collapsed" key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <router-link to="/inventario">Inventario</router-link>
      </a-menu-item>
      <a-menu-item v-if="collapsed" key="3">
        <template #icon>
          <ToolFilled />
        </template>
        <router-link to="/personalizar">Personalizar</router-link>
      </a-menu-item>
      <a-menu-item v-if="collapsed" key="4">
        <template #icon>
          <ShoppingCartOutlined />
        </template>
        <router-link to="/distribucion">Ingresos y Retiros</router-link>
      </a-menu-item>
      <a-menu-item v-if="collapsed" key="5">
        <template #icon>
          <FallOutlined />
        </template>
        <router-link to="/mermas">Mermas</router-link>
      </a-menu-item>
      <a-menu-item v-if="collapsed" key="5">
        <a-button type="primary" @click.prevent="authentication.signout()" danger>Logout</a-button>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
// Vue
import { defineComponent, reactive, toRefs, watch } from "vue";

//Firebase
import { useAuthStore } from "@/db/auth";

//Antd
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
    const authentication = useAuthStore();

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

    return { ...toRefs(state), toggleCollapsed,authentication };
  },
  //Uso optionAPI para poder hacer reactiva el navbar puesto que antd usa mas propiedades
  computed: {
    userlog(){
      return useAuthStore().isLoggedIn;
    }
  }
});
</script>
