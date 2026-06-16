<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { clients, type Client } from '@/data/catalog'

type ClientForm = Omit<Client, 'id'>

const clientList = ref<Client[]>([...clients])
const editingId = ref<number | null>(null)
const emptyForm = (): ClientForm => ({
  name: '',
  email: '',
  phone: '',
  status: 'Ativo',
  city: '',
})
const form = reactive<ClientForm>(emptyForm())

const resetForm = () => {
  Object.assign(form, emptyForm())
  editingId.value = null
}

const saveClient = () => {
  if (!form.name || !form.email) return

  if (editingId.value) {
    clientList.value = clientList.value.map((client) =>
      client.id === editingId.value ? { ...client, ...form } : client,
    )
  } else {
    clientList.value.unshift({ ...form, id: Date.now() })
  }

  resetForm()
}

const editClient = (client: Client) => {
  editingId.value = client.id
  Object.assign(form, {
    name: client.name,
    email: client.email,
    phone: client.phone,
    status: client.status,
    city: client.city,
  })
}

const removeClient = (id: number) => {
  clientList.value = clientList.value.filter((client) => client.id !== id)
  if (editingId.value === id) resetForm()
}
</script>

<template>
  <main class="store-shell">
    <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>CRUD de <span>clientes</span></h1>
      <p>Cadastro inicial de clientes para conectar depois ao back-end Laravel.</p>
    </section>

    <section class="page-section crud-layout">
      <form class="crud-panel" @submit.prevent="saveClient">
        <div class="page-header">
          <div>
            <h2>{{ editingId ? 'Editar cliente' : 'Novo cliente' }}</h2>
            <p>Dados principais da tabela clientes.</p>
          </div>
        </div>

        <div class="form-grid">
          <label class="form-field">
            Nome
            <input v-model="form.name" required />
          </label>
          <label class="form-field">
            E-mail
            <input v-model="form.email" required type="email" />
          </label>
          <label class="form-field">
            Telefone
            <input v-model="form.phone" />
          </label>
          <label class="form-field">
            Cidade
            <input v-model="form.city" />
          </label>
          <label class="form-field">
            Status
            <select v-model="form.status">
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </label>
        </div>

        <div class="form-actions">
          <button class="primary-button" type="submit">
            <i class="pi pi-save"></i>
            Salvar
          </button>
          <button class="secondary-button" type="button" @click="resetForm">
            Limpar
          </button>
        </div>
      </form>

      <div class="crud-panel">
        <div class="page-header">
          <div>
            <h2>Clientes cadastrados</h2>
            <p>{{ clientList.length }} registros.</p>
          </div>
        </div>

        <div v-for="client in clientList" :key="client.id" class="admin-row">
          <div class="item-icon">
            <i class="pi pi-user"></i>
          </div>
          <div>
            <strong>{{ client.name }}</strong>
            <p class="muted">{{ client.email }} / {{ client.phone }} / {{ client.city }}</p>
            <span class="status-pill" :class="{ inactive: client.status === 'Inativo' }">
              {{ client.status }}
            </span>
          </div>
          <div class="table-actions">
            <button class="secondary-button" type="button" @click="editClient(client)">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="danger-button" type="button" @click="removeClient(client.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
