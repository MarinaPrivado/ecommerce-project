<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Default from '@/layouts/Default.vue'
import Guest from '@/layouts/Guest.vue'

const route = useRoute()
const auth = useAuthStore()

onMounted(() => {
  auth.check()
})
</script>

<template>
  <Default v-if="route.meta.layout !== 'guest'">
    <RouterView />
  </Default>
  <Guest v-else>
    <RouterView />
  </Guest>
</template>
