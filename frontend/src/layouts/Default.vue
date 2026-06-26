<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logo from '@/img/nexvolt_logo.svg'

const auth = useAuthStore()
</script>

<template>
  <main class="store-shell">
    <div class="store-topbar">
      <i class="pi pi-bolt" aria-hidden="true"></i>
      <span>Entrega rapida para compras acima de R$ 299</span>
    </div>

    <nav class="store-nav" aria-label="Navegacao principal">
      <RouterLink class="store-logo" to="/">
        <img :src="logo" alt="NexVolt" />
      </RouterLink>

      <div class="store-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/listagem">Produtos</RouterLink>
        <RouterLink to="/carrinho">Carrinho</RouterLink>
      </div>

      <div class="store-actions">
        <template v-if="auth.isAuthenticated">
          <span class="user-badge">{{ auth.user?.name }}</span>
          <button class="icon-button" @click="auth.logout()" aria-label="Sair" title="Sair">
            <i class="pi pi-sign-out"></i>
          </button>
        </template>
        <RouterLink v-else class="icon-button" to="/login" aria-label="Login">
          <i class="pi pi-user"></i>
        </RouterLink>
        <RouterLink class="icon-button" to="/carrinho" aria-label="Carrinho">
          <i class="pi pi-shopping-cart"></i>
        </RouterLink>
      </div>
    </nav>

    <slot />

    <footer class="footer">
      <div>
        <strong>NexVolt</strong>
        <p>Projeto e-commerce.</p>
      </div>
      <div>
        <strong>Loja</strong>
        <RouterLink to="/listagem">Produtos</RouterLink>
        <RouterLink to="/carrinho">Carrinho</RouterLink>
      </div>
      <div>
        <strong>Sistema</strong>
        <RouterLink to="/admin/produtos">Admin</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
      </div>
      <div>
        <strong>Conta</strong>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </footer>
  </main>
</template>
