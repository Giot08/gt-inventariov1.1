/* eslint-disable */
import { defineStore } from "pinia";
import {
  getAuth,
  signOut,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = defineStore({
    id: "auth",
  state: () => ({
    isLoggedIn: false,
    email: "",
    password: "",
    /*repassword: "",
    errorMessage: "", */
  }),
  actions: {
    /*
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("¡Registrado!");
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage);
        }); 
    },
    */
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          alert("¡Sesión iniciada!");
          const user = userCredential.user;
          console.log(user, this.isLoggedIn);
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          console.log('ERROR' + errorCode, this.errorMessage);
        });
    },
    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.email = "";
          console.log("¡Sesión finalizada!");
          next("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          console.log(errorCode, this.errorMessage);
        });
    },
  },
});
