//APP
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);

// Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDOZHYCWDJboxIA4ylzWTtqmqalnmmJD0U",
  authDomain: "app-inventario-giot.firebaseapp.com",
  projectId: "app-inventario-giot",
  storageBucket: "app-inventario-giot.appspot.com",
  messagingSenderId: "79317979628",
  appId: "1:79317979628:web:faa81407fff018c7d4f0c9"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export {db}

//UX/UI
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

//Init app
app.use(router).use(pinia).use(Antd);


// Components
// import
import NavBar from "@/components/NavbarComponent.vue";

// Declarations
app.component("navbar-component", NavBar);


//Mount
app.mount("#app");
