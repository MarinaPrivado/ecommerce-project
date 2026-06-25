<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import Default from '@/layouts/Default.vue'
import Guest from '@/layouts/Guest.vue'

const route = useRoute()
</script>

<template>
  <Default v-if="route.meta.layout !== 'guest'">
    <RouterView />
  </Default>
  <Guest v-else>
    <RouterView />
  </Guest>
</template>
