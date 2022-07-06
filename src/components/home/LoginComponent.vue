<template>
  <h3>Iniciar Sesión</h3>
  <a-form @submit.prevent="authentication.signIn()">
    <a-input
      size="large"
      allowClear
      v-model:value="authentication.email"
      placeholder="Email"
      required
    >
      <template #prefix>
        <user-outlined type="user" />
      </template>
    </a-input>
    <a-input-password
      required
      size="large"
      v-model:value="authentication.password"
      placeholder="Password"
    >
      <template #prefix>
        <lock-outlined type="password" />
      </template>
    </a-input-password>
    <div class="log-button">
      <a-button>Recuperar contraseña</a-button>
      <a-button html-type="submit" type="primary">Login</a-button>
    </div>
  </a-form>
</template>

<script setup>
//Firebase
import { useAuthStore } from "@/db/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//Andt
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

const authentication = useAuthStore();
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    authentication.isLoggedIn = true;
    authentication.email = user.email;
  } else {
    authentication.isLoggedIn = false;
  }
});
</script>

<style>
.log-button {
  display: flex;
  width: 100%;
  justify-content: end;
}
</style>