/* eslint-disable */
import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore/lite";
import { db } from "@/main";

export const useInventoryStore = defineStore({
  id: "inventory",
  state: () => {
    return {
      storages: [],
      products: [],
      storage_reg: [],
      inventoryTable: [
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
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
          sorter: {
            compare: (a, b) => a.stock.localeCompare(b.stock),
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
          modelStock: 0,
        },
        {
          title: "Borrar",
          dataIndex: "delete",
        },
      ],
      reportTable: [
        {
          title: "Fecha",
          dataIndex: "date",
          key: "date",
          sorter: {
            compare: (a, b) => a.date.localeCompare(b.date),
          },
        },
        {
          title: "Registro",
          dataIndex: "register",
          key: "register",
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
    ////////////////////////////////////////////////////////////////
    async modifyStock(action, storage, id, name, stock, medition, modelStock) {
      // date format
      let date = new Date();
      const dateString = date.toLocaleDateString();
      const getHours =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const fullDate = `${dateString} ${getHours}`;

      if (modelStock == 0 || modelStock == undefined) {
        return;
      } else {
        console.log(action, storage, id, name, stock, medition, modelStock);
        if (action == "Ingresado") {
          const newStock = Number(stock + modelStock);
          console.log(newStock);
          await updateDoc(doc(db, storage, id), {
            stock: newStock,
            lastIn: fullDate,
          });
          this.getInventoryData();

          this.storageActions(
            action,
            storage,
            name,
            medition,
            modelStock,
            fullDate,
            newStock
          );
        } else {
          const newStock = Number(stock - modelStock);
          console.log(newStock);
          await updateDoc(doc(db, storage, id), {
            stock: newStock,
            lastWithdraw: fullDate,
          });
          this.getInventoryData();
          this.storageActions(
            action,
            storage,
            name,
            medition,
            modelStock,
            fullDate,
            newStock
          );
        }
      }
    },
    async storageActions(
      action,
      storage,
      name,
      medition,
      modelStock,
      fullDate,
      newStock
    ) {
      await addDoc(collection(db, "storageActions"), {
        register: `Se a ${action} la cantidad de ${modelStock} ${medition} de ${name} en ${storage} a la fecha de ${fullDate} quedando el stock de ${newStock}${medition}`,
        date: fullDate,
      });
      this.storage_reg = [];
      this.getStorageActions();
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
    async getStorageActions() {
      const coll = await getDocs(collection(db, "storageActions"));
      coll.forEach((doc) => {
        let dataCat = doc.data();
        dataCat.id = doc.id;
        this.storage_reg.push(dataCat);
      });
      this.storage_reg = this.storage_reg.sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });
      console.log(this.storage_reg);
    },
  },
});
