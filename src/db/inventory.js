/* eslint-disable */
import { defineStore } from "pinia";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "@/main";

export const useInventoryStore = defineStore({
  id: "inventory",
  state: () => {
    return {
      bodegas: [],
      inventario: [],
      productos: [],
      columns: [
        {
          title: "Bodega",
          dataIndex: "bodega",
          key: "bodega",
          sorter: {
            compare: (a, b) => a.bodega.localeCompare(b.bodega),
          },
        },
        {
          title: "Categoria",
          dataIndex: "categoria",
          key: "categoria",
          sorter: {
            compare: (a, b) => a.categoria.localeCompare(b.categoria),
          },
        },
        {
          title: "Sub Categoria",
          dataIndex: "subcategoria",
          key: "subcategoria",
          sorter: {
            compare: (a, b) => a.subcategoria.localeCompare(b.subcategoria),
          },
        },
        {
          title: "Producto",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
        },
        {
          title: "Medida",
          dataIndex: "unidad",
          key: "unidad",
          sorter: {
            compare: (a, b) => a.unidad.localeCompare(b.unidad),
          },
        },
        {
          title: "Ult. Ingreso",
          dataIndex: "ultIngreso",
          key: "ultIngreso",
          sorter: {
            compare: (a, b) => a.ultIngreso.localeCompare(b.ultIngreso),
          },
        },
        {
          title: "Ult. Retiro",
          dataIndex: "ultRetiro",
          key: "ultRetiro",
          sorter: {
            compare: (a, b) => a.ultRetiro.localeCompare(b.ultRetiro),
          },
        },
        {
          title: "Borrar",
          dataIndex: "borrar",
        },
      ],
    };
  },
  actions: {
    async delProduct(id, collection) {
      const coll = collection;
      console.log(id, coll);
      await deleteDoc(doc(db, coll, id));
      this.montar();
    },
    async getInventario() {
      for (let i = 0; i < this.bodegas.length; i++) {
        const coll = await getDocs(
          collection(db, `Bodega ${this.bodegas[i].name}`)
        );
        coll.forEach((doc) => {
          let dataCat = doc.data();
          dataCat.id = doc.id;
          this.inventario.push(dataCat);
        });
      }
      this.getProductosInventario();
    },
    async getBodegas() {
      const coll = await getDocs(collection(db, "bodegas"));
      coll.forEach((doc) => {
        let dataCat = doc.data();
        dataCat.id = doc.id;
        this.bodegas.push(dataCat);
      });
      this.bodegas = this.bodegas.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      this.getInventario();
    },
    getProductosInventario() {
      for (let i = 0; i < this.bodegas.length; i++) {
        if (i == 0) {
          this.productos.Iquique = this.inventario.filter(
            (item) => item.bodega == this.bodegas[i].name
          );
        } else {
          this.productos.Pica = this.inventario.filter(
            (item) => item.bodega == this.bodegas[i].name
          );
        }
      }
    },
    montar() {
      console.log("montando");
      this.inventario = [];
      this.bodegas = [];
      this.productos = [];
      this.getBodegas();
      this.getProductosInventario();
    },
  },
});
