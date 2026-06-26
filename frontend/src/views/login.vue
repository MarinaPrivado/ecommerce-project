<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

async function entrarComo(role: 'client' | 'admin') {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Preencha o e-mail e a senha para entrar.'
    return
  }
  const ok = await auth.login(email.value, password.value, role)
  if (!ok) {
    error.value = 'Credenciais inválidas para este tipo de conta.'
    return
  }
  router.push(role === 'admin' ? '/admin/produtos' : '/')
}
</script>

<template>
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Acesso à <span>NexVolt</span></h1>
      <p>Novo por aqui? <RouterLink to="/signup">Realize seu cadastro</RouterLink>.
      </p>
      <RouterLink class="ghost-button" to="/signup">
        <i class="pi pi-user-plus"></i>
        Fazer cadastro
      </RouterLink>
    </section>

    <section class="page-section">
      <form class="crud-panel" style="max-width: 520px; margin: 0 auto" @submit.prevent>
        <div class="form-grid">
          <label class="form-field full">
            E-mail
            <input v-model="email" type="email" placeholder="seuemail@exemplo.com" />
          </label>
          <label class="form-field full">
            Senha
            <input v-model="password" type="password" placeholder="Digite sua senha" />
          </label>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <div class="form-actions">
          <button class="primary-button" type="button" @click="entrarComo('client')">Entrar como cliente</button>
          <button class="secondary-button" type="button" @click="entrarComo('admin')">Entrar como admin</button>
        </div>
      </form>
    </section>
</template>
