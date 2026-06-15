<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="flex justify-center gap-4 p-4 border-b">
    <RouterLink to="/" class="text-blue-600 hover:underline">Home</RouterLink>
    <RouterLink to="/listagem" class="text-blue-600 hover:underline">Listagem</RouterLink>
  </nav>
  <RouterView />
</template>