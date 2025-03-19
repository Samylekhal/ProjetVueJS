   <script setup lang="ts">
   import { ref, computed } from "vue";
   import { auth } from '../../firebase'
   import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
   import { useDataScoreStore } from "@/stores/firebaseStore";

   const dataScoreStore = useDataScoreStore();
   
   const displayName = ref("");
   const email = ref("");
   const password = ref("");


   const isFormValid = computed(() => email.value !== "" && password.value.length >= 6);
   const signup = async () => {
    if (!isFormValid.value) {
    alert("Veuillez entrer un email valide et un mot de passe d'au moins 6 caractères.");
    return;
    }
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (displayName.value) {
      // Utilisez updateProfile pour mettre à jour le profil de l'utilisateur
      await updateProfile(user, { displayName: displayName.value });
    }
    dataScoreStore.setPseudo(displayName.value);
    alert("Compte créé avec succès !");
  } catch (error) {
    alert(error.message);
  }
  }
</script>

<template>
    <div>
    <h2>Inscription</h2>
    <input v-model="displayName" type="text" placeholder="Nom d'utilisateur" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="signup">S'inscrire</button>
    </div>
</template>