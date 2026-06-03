<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => router.push("/");
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <p>Página de login em construção.</p>
    <button class="back-btn" @click="goHome">Voltar</button>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.back-btn {
  background-color: #6b7280;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  margin-top: 1rem;
}

.back-btn:hover {
  background-color: #4b5563;
}
</style>
