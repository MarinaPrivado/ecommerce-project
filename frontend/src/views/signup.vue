<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { register as apiRegister } from '@/data/api'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const role = ref<'client' | 'admin'>('client')
const error = ref('')

async function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value) {
    error.value = 'Preencha todos os campos.'
    return
  }

  if (password.value !== passwordConfirm.value) {
    error.value = 'As senhas não conferem.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter no mínimo 6 caracteres.'
    return
  }

  try {
    const res = await apiRegister(name.value, email.value, password.value, role.value)
    localStorage.setItem('auth_token', res.token)
    auth['user'] = res.user as any
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Erro ao cadastrar.'
  }
}
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
      <form class="crud-panel" style="max-width: 520px; margin: 0 auto" @submit.prevent="handleRegister">
        <div class="form-grid">
          <label class="form-field full">
            Nome
            <input v-model="name" type="text" placeholder="Seu nome completo" required />
          </label>
          <label class="form-field full">
            E-mail
            <input v-model="email" type="email" placeholder="seuemail@exemplo.com" required />
          </label>
          <label class="form-field full">
            Senha
            <input v-model="password" type="password" placeholder="Digite sua senha" required />
          </label>
          <label class="form-field full">
            Repetir Senha
            <input v-model="passwordConfirm" type="password" placeholder="Digite sua senha novamente" required />
          </label>
          
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <div class="form-actions">
          <button class="primary-button" type="submit">Cadastrar</button>
        </div>
      </form>
    </section>
</template>
