<template>
  <h3>Iniciar Sesión</h3>
  <a-input size="large" allowClear v-model:value="userName" placeholder="Email">
    <template #prefix>
      <user-outlined type="user" />
    </template>
  </a-input>
  <a-input-password size="large" v-model:value="value" placeholder="Password">
    <template #prefix>
      <lock-outlined type="password" />
    </template>
  </a-input-password>
  <div class="auth-button">
    <a-button>Recuperar contraseña</a-button>
    <a-button type="primary">Login</a-button>
  </div>
</template>

<script setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const userName = ref("");
</script>

<style>
</style>