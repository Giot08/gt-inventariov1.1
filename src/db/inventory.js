/* eslint-disable */
import { defineStore } from "pinia";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "@/main";

export const useInventoryStore = defineStore({
  id: "inventory",
  state: () => {
    return {
      storages: [],
      products: [],
      columns: [
        {
          title: "Bodega",
          dataIndex: "storage",
          key: "storage",
          sorter: {
            compare: (a, b) => a.storage.localeCompare(b.storage),
          },
        },
        {
          title: "Categoria",
          dataIndex: "category",
          key: "category",
          sorter: {
            compare: (a, b) => a.category.localeCompare(b.category),
          },
        },
        {
          title: "Sub Categoria",
          dataIndex: "subcategory",
          key: "subcategory",
          sorter: {
            compare: (a, b) => a.subcategory.localeCompare(b.subcategory),
          },
        },
        {
          title: "Producto",
          dataIndex: "name",
          key: "name",
          sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
          },
        },
        {
          title: "Medida",
          dataIndex: "medition",
          key: "medition",
          sorter: {
            compare: (a, b) => a.medition.localeCompare(b.medition),
          },
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
          sorter: {
            compare: (a, b) => a.stock.localeCompare(b.stock),
          },
        },
        {
          title: "Ult. Ingreso",
          dataIndex: "lastIn",
          key: "lastIn",
          sorter: {
            compare: (a, b) => a.lastIn.localeCompare(b.lastIn),
          },
        },
        {
          title: "Ult. Retiro",
          dataIndex: "lastWithdraw",
          key: "lastWithdraw",
          sorter: {
            compare: (a, b) => a.lastWithdraw.localeCompare(b.lastWithdraw),
          },
        },
        {
          title: "Editar",
          dataIndex: "edit",
        },
        {
          title: "Borrar",
          dataIndex: "delete",
        },
      ],
    };
  },
  actions: {
    async getStorages() {
      const coll = await getDocs(collection(db, "storages"));
      coll.forEach((doc) => {
        let dataCat = doc.data();
        dataCat.id = doc.id;
        this.storages.push(dataCat);
      });
      console.log(this.storages);
      this.getProducts();
    },
    async getProducts() {
      for (let i = 0; i < this.storages.length; i++) {
        const coll = await getDocs(collection(db, this.storages[i].name));
        coll.forEach((doc) => {
          let dataCat = doc.data();
          dataCat.id = doc.id;
          this.products.push(dataCat);
        });
      }
      this.products = this.products.sort(function (a, b) {
        return a.storage.localeCompare(b.storage);
      });
      console.log(this.products);
    },
    modifyStock(action, storage, id, name, stock, medition) {
      console.log(action, storage, id, name, stock, medition);
    },
    async deleteProductFromStorage(id, collection) {
      const coll = collection;
      console.log(id, coll);
      await deleteDoc(doc(db, coll, id));
      this.getInventoryData();
    },
    getInventoryData() {
      this.storages = [];
      this.products = [];
      this.getStorages();
    },
  },
});
