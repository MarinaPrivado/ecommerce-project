<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Realizar cadastro</h1>
      <p>Crie sua conta para acessar os benefícios de ser um cliente registrado.</p>
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
          <label class="form-field full">
            Tipo de usuário
            <select>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
        </div>
        <div class="form-actions" >
          <RouterLink class="primary-button" to="/login">Cadastrar</RouterLink>
        
                 
        </div>
      </form>
    </section>
</template>
