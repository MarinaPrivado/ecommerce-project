<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="store-shell">
    <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Acesso da <span>NexVolt</span></h1>
      <p>Entrada visual para clientes e administradores do e-commerce.</p>
    </section>

    <section class="page-section">
      <form class="crud-panel" style="max-width: 520px; margin: 0 auto">
        <div class="form-grid">
          <label class="form-field full">
            E-mail
            <input type="email" placeholder="seuemail@exemplo.com" />
          </label>
          <label class="form-field full">
            Senha
            <input type="password" placeholder="Digite sua senha" />
          </label>
        </div>
        <div class="form-actions">
          <RouterLink class="primary-button" to="/clientes">Entrar como cliente</RouterLink>
          <RouterLink class="secondary-button" to="/admin/produtos">Entrar como admin</RouterLink>
        </div>
      </form>
    </section>
  </main>
</template>
