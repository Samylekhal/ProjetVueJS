<template>
    <div>
    <h2>Connexion</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login" >Se connecter</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDataScoreStore } from "@/stores/firebaseStore";


const dataScoreStore = useDataScoreStore();
const email = ref("");
const password = ref("");


const isFormValid = computed(() => email.value !== "" && password.value.length >= 6);
const login = async () =>{
if (!isFormValid.value) {
    alert("Veuillez entrer un email valide et un mot de passe d'au moins 6 caractères.");
    return;
}

 try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Connexion réussie !");
    dataScoreStore.setPseudo(auth.currentUser.displayName);    
    console.log(auth.currentUser.displayName);

} catch (error) {
    alert(error.message);
}
};
</script>