<script setup>
import{useRouter} from"vue-router";
import logo from "@/img/nexvolt_logo.svg";


const router = useRouter();
const goToLogin = () => router.push("/login");
</script>



<template>
  <img :src="logo" alt="Logo" class="logo" />
  <div class="home">
    <h1>Bem-vindo à nossa plataforma de gerenciamento de estoque!</h1>
    <p>Faça login para acessar suas funcionalidades.</p>
    <button class="large" @click="goToLogin">Login</button>
    
         </div>
</template>



<style>     
@import "tailwindcss";
@import "tailwindcss-primeui";
@import "@/assets/home.css";

.p-button {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
</style>