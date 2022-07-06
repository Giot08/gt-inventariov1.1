import { defineStore } from "pinia";

export const useStore = defineStore("IndexStore", {
  state: () => {
    return {
      name: "GT-Inventario v-1.1.0",
      author: "Jose Miguel Torres",
      email: "xgiot08@gmail.com",
    };
  },
});
