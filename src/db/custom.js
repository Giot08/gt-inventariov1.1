/* eslint-disable */
import { defineStore } from "pinia";
import { Modal } from "ant-design-vue";
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

  state: () => {
    return {
      container: [
        {
          label: "Bodega",
          arg: "storages",
          placeholder: "Añardir Bodega",
          type: "text",
          model: "",
          columns: [
            {
              title: "Bodegas",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
              },
            },
            {
              title: "",
              dataIndex: "borrar",
            },
          ],
          data: [],
        },
        {
          label: "Categoria",
          arg: "categories",
          placeholder: "Añardir Categoria",
          type: "text",
          model: "",
          columns: [
            {
              title: "Categorias",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
              },
            },
            {
              title: "",
              dataIndex: "borrar",
            },
          ],
          data: [],
        },
        {
          label: "Sub categoria",
          arg: "subcategories",
          placeholder: "Añardir Sub categoria",
          type: "text",
          model: "",
          columns: [
            {
              title: "Sub categorias",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
              },
            },
            {
              title: "",
              dataIndex: "borrar",
            },
          ],
          data: [],
        },
        {
          label: "Medicion",
          arg: "meditions",
          placeholder: "Añardir Medicion",
          type: "text",
          model: "",
          columns: [
            {
              title: "Mediciones",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
              },
            },
            {
              title: "",
              dataIndex: "borrar",
            },
          ],
          data: [],
        },
      ],
      product: {
        name: "Nombre",
        category: "Categoria",
        subcategory: "Sub Categoria",
        medition: "Unidad de Medida",
      },
      productclass: {
        label: "Producto",
        arg: "products",
        placeholder: "Añardir Producto",
        type: "text",
        model: "",
        table: {
          label: "Produtos añadidos",
          arg: "productClass",
          columns: [
            {
              title: "Nombre",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
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
              title: "Medición",
              dataIndex: "medition",
              key: "medition",
              sorter: {
                compare: (a, b) => a.medition.localeCompare(b.medition),
              },
            },
            {
              title: "Eliminar",
              dataIndex: "borrar",
            },
          ],
          data: [],
        },
      },
    };
  },
  actions: {
    //Agrega un producto sin stock a todas las bodegas
    async addProduct() {
      // const store = this.container[0].data;
      // console.log(store[0].name);
      const name = this.product.name;
      const category = this.product.category;
      const subcategory = this.product.subcategory;
      const medition = this.product.medition;

      if (name.toLowerCase() === "nombre" || name === "") {
        Modal.warning({
          title: "Nombre Invalido",
          content: "Por favor ingresa un nombre valido",
        });
      } else if (category.toLowerCase() === "categoria" || category === "") {
        Modal.warning({
          title: "Categoria Invalida",
          content: "Por favor ingresa una categoria valida",
        });
      } else if (
        subcategory.toLowerCase() === "sub categoria" ||
        subcategory === ""
      ) {
        Modal.warning({
          title: "Sub categoria Invalida",
          content: "Por favor ingresa una sub categoria valida",
        });
      } else if (
        medition.toLowerCase() === "unidad de medida" ||
        medition === ""
      ) {
        Modal.warning({
          title: "Unidad de medida invalida",
          content: "Por favor ingresa una unidad de medida invalida valido",
        });
      } else {
        for (let i = 0; i < store.length; i++) {
          let storage = store[i].name;
          await addDoc(collection(db, storage), {
            storage: storage,
            name: name,
            category: category,
            subcategory: subcategory,
            medition: medition,
            lastIn: "Sin ingreso registrado",
            lastWithdraw: "Sin retiro registrado",
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
          name: name,
          category: category,
          subcategoruy: subcategory,
          medition: medition,
        })
          .then(() => {
            this.product = {
              name: "Nombre",
              category: "Categoria",
              subcategory: "Sub Categoria",
              medition: "Unidad de Medida",
            };
            this.products = [];
            this.getData("products");
            console.log("producto añadido");
          })
          .catch(function (error) {
            alert("Error al añadir el documento!", error);
            console.error("Error al añadir el documento!", error);
          });
      }
    },
    async addItem(type) {
      // Intentar eliminar los if y usar solo el type para crear una funcion valida
      // console.log(type);

      if (type === "storages" && this.container[0].model.length > 0) {
        await addDoc(collection(db, "storages"), {
          name: this.container[0].model,
        })
          .then(() => {
            this.container[0].data = [];
            this.container[0].model = "";
            this.getData("storages");
            console.log(this.container[0]);
          })
          .catch((error) => {
            alert("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      } else if (type === "categories" && this.container[1].model.length > 0) {
        await addDoc(collection(db, "categories"), {
          name: this.container[1].model,
        })
          .then(() => {
            this.container[1].data = [];
            this.container[1].model = "";
            this.getData("categories");
            console.log(this.container[1].data);
          })
          .catch((error) => {
            alert("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      } else if (
        type === "subcategories" &&
        this.container[2].model.length > 0
      ) {
        await addDoc(collection(db, "subcategories"), {
          name: this.container[2].model,
        })
          .then(() => {
            this.container[2].data = [];
            this.container[2].model = "";
            this.getData("subcategories");
            console.log(this.container[2].data);
          })
          .catch((error) => {
            alert.error("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      } else if (type === "meditions" && this.container[3].model.length > 0) {
        await addDoc(collection(db, "meditions"), {
          name: this.container[3].model,
        })
          .then(() => {
            this.container[3].data = [];
            this.container[3].model = "";
            this.getData("meditions");
            console.log(this.container[3].data);
          })
          .catch((error) => {
            alert("Error al añadir el documento: ", error);
            console.error("Error al añadir el documento: ", error);
          });
      }
    },
    async getData(prop) {
      const coll = await getDocs(collection(db, prop));
      coll.forEach((doc) => {
        let dataCat = doc.data();
        dataCat.id = doc.id;

        if (prop === "storages") {
          this.container[0].data.push(dataCat);
        } else if (prop === "categories") {
          //Aca empujamos
          // this.prop.push(dataCat); Probar este medoto cuando todo este conectado
          this.container[1].data.push(dataCat);
        } else if (prop === "subcategories") {
          this.container[2].data.push(dataCat);
        } else if (prop === "meditions") {
          this.container[3].data.push(dataCat);
        } else if (prop === "products") {
          this.container[4].data.push(dataCat);
        }
      });
    },
    getAllDatas() {
      console.log("Montando all data");
      this.getData("storages");
      this.getData("categories");
      this.getData("subcategories");
      this.getData("meditions");
      this.getData("products");
    },

    async deleteItem(id, collection) {
      console.log(id, collection);

      const coll = collection;
      await deleteDoc(doc(db, coll, id)).then(() => {
        if (coll === "storages") {
          this.container[0].data = this.container[0].data.filter(
            (item) => item.id !== id
          );
        } else if (coll === "categories") {
          this.container[1].data = this.container[1].data.filter(
            (item) => item.id !== id
          );
        } else if (coll === "subcategories") {
          this.container[2].data = this.container[2].data.filter(
            (item) => item.id !== id
          );
        } else if (coll === "meditions") {
          this.container[3].data = this.container[3].data.filter(
            (item) => item.id !== id
          );
        } else if (coll === "products") {
          this.container[4].data = this.container[4].data.filter(
            (item) => item.id !== id
          );
        }
      });
    },
  },
});
