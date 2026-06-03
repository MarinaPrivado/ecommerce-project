<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToLogin = () => router.push("/login");
</script>

<template>
  <div class="home">
    <h1>Bem-vindo à nossa plataforma de gerenciamento de estoque!</h1>
    <p>Faça login para acessar suas funcionalidades.</p>
    <button class="login-btn" @click="goToLogin">Login</button>
  </div>
</template>

<style>
@import "@/assets/home.css";
</style>