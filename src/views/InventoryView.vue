<template>
  <div>
    <a-affix :offset-top="top">
      <a-button type="primary" @click="top += 10">Inventario</a-button>
    </a-affix>
    <br>
    <div
      v-if="
        this.productos.length == 0 &&
        this.inventario.length == 0 &&
        this.bodegas.length == 0
      "
      class="text-center my-3"
    >
      <div
        class="spinner-border"
        style="width: 5rem; height: 5rem"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
      <div class="my-3">Cargando...</div>
    </div>
    <div v-else>
      <table class="table bg-light">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Bodega</th>
            <th scope="col">Categoria</th>
            <th scope="col">Sub categoria</th>
            <th scope="col">Producto</th>
            <th scope="col">Stock</th>
            <th scope="col">%</th>
            <th scope="col">Ult. Ingreso</th>
            <th scope="col">Ult. Retiro</th>
            <th scope="col">
              <input
                class="form-check-input mx-1 bg-warning"
                type="checkbox"
                value="true"
                v-model="deleteOpt"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in productos.Iquique" :key="index">
            <!-- <th scope="row">{{ item.bodega }}</th> -->
            <td>{{ item.bodega }}</td>
            <td>{{ item.categoria }}</td>
            <td>{{ item.subcategoria }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.unidad }}</td>
            <td>{{ item.ultIngreso }}</td>
            <td>{{ item.ultRetiro }}</td>
            <td v-show="deleteOpt">
              <button
                @click.prevent="eliminarDato(item.id, `Bodega ${item.bodega}`)"
                class="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr v-for="(item, index) in productos.Pica" :key="index">
            <!-- <th scope="row">{{ item.bodega }}</th> -->
            <td>{{ item.bodega }}</td>
            <td>{{ item.categoria }}</td>
            <td>{{ item.subcategoria }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.unidad }}</td>
            <td>{{ item.ultIngreso }}</td>
            <td>{{ item.ultRetiro }}</td>
            <td v-show="deleteOpt">
              <button
                @click.prevent="eliminarDato(item.id, `Bodega ${item.bodega}`)"
                class="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <p>{{this.inventario}}</p> -->
      <p>{{ this.productos }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "@/main";

export default {
  data() {
    return {
      deleteOpt: false,
      bodegas: [],
      inventario: [],
      productos: [],
    };
  },
  methods: {
    async eliminarDato(id, collection) {
      const coll = collection;
      // console.log(id, coll)
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
        // let bodegaID = this.bodegas[i].name
        // this.productos[bodegaID] = this.inventario.filter(item => item.bodega === bodegaID)
      }
    },
    montar() {
      this.inventario = [];
      this.bodegas = [];
      this.productos = [];
      this.getBodegas();
      this.getProductosInventario();
    },
  },
  mounted() {
    this.montar();
    console.log("bodegas", this.bodegas);
    console.log("inventario", this.inventario);
    console.log("productos", this.productos);
  },
};
</script>

<style scoped>
table {
  margin-right: 10px;
}
</style>