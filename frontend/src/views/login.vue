<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Acesso à <span>NexVolt</span></h1>
      <p>Novo por aqui? Realize seu cadastro.</p>     

    <div class="form-actions">
          <RouterLink class="primary-button" to="/signup">Realizar cadastro</RouterLink>
         </div>
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
          <label class="form-field full">
            Repetir Senha
            <input type="password" placeholder="Digite sua senha novamente" />
          </label>

        </div>
        <div class="form-actions">
          <RouterLink class="primary-button" to="/clientes">Entrar como cliente</RouterLink>
          <RouterLink class="secondary-button" to="/admin/produtos">Entrar como admin</RouterLink>
        </div>
      </form>
    </section>
</template>
