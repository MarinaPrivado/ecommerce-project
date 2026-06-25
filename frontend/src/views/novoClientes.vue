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
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Área de <span>clientes</span></h1>
      >
    </section>

    <section class="page-section crud-layout">
      <form class="crud-panel" @submit.prevent="saveClient">
        <div class="page-header">
          <div>
            <h2>{{ editingId ? 'Editar cliente' : 'Novo cliente' }}</h2>
            <p>Dados principais dos clientes.</p>
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

       

        
      
    </section>
</template>
