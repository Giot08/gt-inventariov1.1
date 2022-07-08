/* eslint-disable */
import { defineStore } from "pinia";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "@/main";

export const useCustomStore = defineStore({
  id: "custom",
  state: () => ({
    container: [
      {
        label: "Bodega",
        placeholder: "Añardir Bodega",
        type: "text",
        model: '{this.data.storage}',
      },
      {
        label: "Categoria",
        placeholder: "Añardir Categoria",
        type: "text",
        model: "text",
      },
      {
        label: "Sub categoria",
        placeholder: "Añardir Sub categoria",
        type: "text",
        model: "text",
      },
      {
        label: "Medicion",
        placeholder: "Añardir Medicion",
        type: "text",
        model: "text",
      },
      {
        label: "Producto",
        placeholder: "Añardir Producto",
        type: "text",
        model: "text",
      },
    ],
    data: {
      category: "",
      subCategory: "",
      medition: "",
      product: {
        name: "",
        category: "",
        subcategory: "",
        medition: "",
      },
      storage: "",
    },
    categories: [],
    subcategories: [],
    meditions: [],
    products: [],
    storages: [],
  }),
  actions: {
    //Agrega un producto sin stock a todas las bodegas
    async addProduct() {
      for (let i = 0; i < this.storages.length; i++) {
        let storage = this.storages[i].name;
        await addDoc(collection(db, storage), {
          bodega: storage,
          nombre: this.data.product.name,
          categoria: this.data.product.proCategory,
          subcategoria: this.data.product.proSubCategory,
          unidad: this.data.product.proMedition,
          ultIngreso: "Sin ingreso registrado",
          ultRetiro: "Sin Retiro registrado",
          stock: 0,
        })
          .then(() => {
            console.log("producto añadido al inventario");
          })
          .catch(function (error) {
            alert("Error al añadir el documento", error);
            console.error("Error al añadir el documento", error);
          });
      }
      await addDoc(collection(db, "productClass"), {
        name: this.datos.product.name,
        category: this.datos.product.proCategory,
        subcategoruy: this.datos.product.proSubCategory,
        medition: this.datos.product.proMedition,
      })
        .then(() => {
          this.products = [];
          this.datos.product = [];
          this.getData("products");
          console.log("producto añadido");
        })
        .catch(function (error) {
          alert("Error al añadir el documento!", error);
          console.error("Error al añadir el documento!", error);
        });
    },
    async addItem(type) {
      // Intentar eliminar los if y usar solo el type para crear una funcion valida
      if (type === "categories" && this.data.category.length > 0) {
        await addDoc(collection(db, "categories"), {
          name: this.data.category,
        })
          .then(() => {
            this.categories = [];
            this.data.category = "";
            this.getData("categories");
            console.log(this.categorias);
          })
          .catch((error) => {
            alert("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      } else if (type === "subcategories" && this.data.subCategory.length > 0) {
        await addDoc(collection(db, "subcategories"), {
          name: this.data.subCategory,
        })
          .then(() => {
            this.subcategories = [];
            this.data.subCategory = "";
            this.getData("subcategories");
            console.log(this.subcategories);
          })
          .catch((error) => {
            console.error("Error al añadir el documento: ", error);
          });
      } else if (type === "meditions" && this.datos.unidad.length > 0) {
        await addDoc(collection(db, "meditions"), {
          name: this.data.medition,
        })
          .then(() => {
            this.medition = [];
            this.data.medition = "";
            this.getData("meditions");
            console.log(this.unidades);
          })
          .catch((error) => {
            alert("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      } else if (type === "storages" && this.data.storage.length > 0) {
        await addDoc(collection(db, "storages"), {
          name: this.data.storage,
        })
          .then(() => {
            this.storages = [];
            this.data.storage = "";
            this.getData("storages");
            // console.log(this.bodegas)
          })
          .catch((error) => {
            console.error("Error al añadir el documento: ", error);
          });
      }
    },
    async getData(prop) {
      const coll = await getDocs(collection(db, prop));
      coll.forEach((doc) => {
        let dataCat = doc.data();
        dataCat.id = doc.id;

        if (prop === "categories") {
          //Aca empujamos
          // this.prop.push(dataCat); Probar este medoto cuando todo este conectado
          this.categories.push(dataCat);
          this.categories = this.categories.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        } else if (prop === "subcategories") {
          this.subcategories.push(dataCat);
          this.subcategories = this.subcategories.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        } else if (prop === "meditions") {
          this.meditions.push(dataCat);
          this.meditions = this.meditions.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        } else if (prop === "products") {
          this.products.push(dataCat);
          this.products = this.products.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        } else if (prop === "storages") {
          this.storages.push(dataCat);
          this.storages = this.storages.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        }
      });
    },
    getAllDatas() {
      this.getData("categories");
      this.getData("subcategories");
      this.getProps("meditions");
      this.getData("products");
      this.getData("storages");
    },

    async deleteItem(id, collection) {
      const coll = collection;
      await deleteDoc(doc(db, coll, id)).then(() => {
        if (coll === "categories") {
          this.categories = this.categories.filter((item) => item.id !== id);
        } else if (coll === "subcategories") {
          this.subcategories = this.subcategories.filter(
            (item) => item.id !== id
          );
        } else if (coll === "meditions") {
          this.meditions = this.meditions.filter((item) => item.id !== id);
        } else if (coll === "products") {
          this.products = this.products.filter((item) => item.id !== id);
        } else if (coll === "storages") {
          this.storages = this.storages.filter((item) => item.id !== id);
        }
      });
    },
  },
});
