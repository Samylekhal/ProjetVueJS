<template>
    <nav>
    <ul>
    <li><router-link to="/">Accueil</router-link></li>
    <li><router-link to="/login">Se connecter</router-link></li>
    <li><router-link to="/signup">S'inscrire</router-link></li>
    <li v-if="isAuthenticated"> <button @click="logout">Déconnexion</button></li>
    </ul>
    </nav>
</template>

<script setup lang="ts">
   import { ref, onMounted } from "vue";
   import { auth } from "../firebase";
   import { signOut } from "firebase/auth"; 
   import { useDataScoreStore } from "@/stores/firebaseStore"; 

   const dataScoreStore = useDataScoreStore(); 

   const isAuthenticated = ref(false);
   // Vérifier si l'utilisateur est connecté
   onMounted(() => {
    isAuthenticated.value = !!auth.currentUser;



   });

   // Fonction de déconnexion
const logout = async () =>{
    await signOut(auth);   
    dataScoreStore.removeallData();
    isAuthenticated.value = false;
    alert("Déconnecté !");
};
</script>


<style scoped>
nav {
 background-color: #333;
 color: white;
 padding: 10px;
}
ul {
 list-style-type: none;
 display: flex;
 gap: 20px;
}
li {
 display: inline;
}
a, button {
 color: white;
 text-decoration: none;
 cursor: pointer;
}
button {
 background-color: red;
 border: none;
 padding: 5px 10px;
}
</style>