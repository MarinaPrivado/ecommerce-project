<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency, products, clients, type Product, type Client } from '@/data/catalog'

type ProductForm = Omit<Product, 'id' | 'rating' | 'specs'>

const productList = ref<Product[]>([...products])
const editingId = ref<number | null>(null)
const emptyForm = (): ProductForm => ({
  name: '',
  brand: '',
  category: 'Notebooks',
  price: 0,
  oldPrice: undefined,
  stock: 0,
  badge: '',
  icon: 'pi-box',
  description: '',
})
const form = reactive<ProductForm>(emptyForm())

const resetForm = () => {
  Object.assign(form, emptyForm())
  editingId.value = null
}

const saveProduct = () => {
  if (!form.name || !form.brand || !form.category) return

  if (editingId.value) {
    productList.value = productList.value.map((product) =>
      product.id === editingId.value
        ? {
            ...product,
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
          }
        : product,
    )
  } else {
    productList.value.unshift({
      ...form,
      id: Date.now(),
      price: Number(form.price),
      stock: Number(form.stock),
      rating: 5,
      specs: ['Cadastro via CRUD', 'Pronto para API Laravel'],
    })
  }

  resetForm()
}

const editProduct = (product: Product) => {
  editingId.value = product.id
  Object.assign(form, {
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    oldPrice: product.oldPrice,
    stock: product.stock,
    badge: product.badge || '',
    icon: product.icon,
    description: product.description,
  })
}

const removeProduct = (id: number) => {
  productList.value = productList.value.filter((product) => product.id !== id)
  if (editingId.value === id) resetForm()
}

const clientList = ref<Client[]>([...clients])
const editingClientId = ref<number | null>(null)
const clientForm = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  status: 'Ativo' as 'Ativo' | 'Inativo',
})

const resetClientForm = () => {
  clientForm.name = ''
  clientForm.email = ''
  clientForm.phone = ''
  clientForm.city = ''
  clientForm.status = 'Ativo'
  editingClientId.value = null
}

const editClient = (client: Client) => {
  editingClientId.value = client.id
  clientForm.name = client.name
  clientForm.email = client.email
  clientForm.phone = client.phone
  clientForm.city = client.city
  clientForm.status = client.status
}

const saveClient = () => {
  if (!clientForm.name || !clientForm.email) return

  if (editingClientId.value) {
    clientList.value = clientList.value.map((c) =>
      c.id === editingClientId.value
        ? { ...c, ...clientForm }
        : c,
    )
  }

  resetClientForm()
}

const removeClient = (id: number) => {
  clientList.value = clientList.value.filter((c) => c.id !== id)
  if (editingClientId.value === id) resetClientForm()
}
</script>

<template>
  <main class="store-shell">
    <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Área do <span>admin</span></h1>
     
     <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button class="primary-button" type="button" @click="resetForm">
       
      <a class="primary-button" href="#produtos-lista">
        <i class="pi pi-box"></i>
        Produtos cadastrados
      </a>
      </button>
      <a class="primary-button" href="#clientes">
        <i class="pi pi-users"></i>
        Clientes cadastrados
      </a>
      </div>
    </section>

    <section class="page-section crud-layout">
      <form class="crud-panel" @submit.prevent="saveProduct">
        <div class="page-header">
          <div>
            <h2>{{ editingId ? 'Editar produto' : 'Novo produto' }}</h2>
            <p>Campos principais da tabela produtos.</p>
          </div>
        </div>

        <div class="form-grid">
          <label class="form-field">
            Produto
            <input v-model="form.name" required />
          </label>
          <label class="form-field">
            Marca
            <input v-model="form.brand" required />
          </label>
          <label class="form-field">
            Categoria
            <select v-model="form.category">
              <option>Notebooks</option>
              <option>Smartphones</option>
              <option>Periféricos</option>
              <option>Componentes</option>
              <option>Áudio</option>
              <option>Acessórios</option>
            </select>
          </label>
          
          <label class="form-field">
            Preco
            <input v-model.number="form.price" min="0" step="0.01" type="number" />
          </label>
          <label class="form-field">
            Estoque
            <input v-model.number="form.stock" min="0" type="number" />
          </label>
          <label class="form-field full">
            Descricao
            <textarea v-model="form.description"></textarea>
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

      <div id="produtos-lista" class="crud-panel">
        <div class="page-header">
          <div>
            <h2>Produtos cadastrados</h2>
            <p>{{ productList.length }} itens no catalogo.</p>
          </div>
        </div>

        <div v-for="product in productList" :key="product.id" class="admin-row">
          <div class="item-icon">
            <i class="pi" :class="product.icon"></i>
          </div>
          <div>
            <strong>{{ product.name }}</strong>
            <p class="muted">
              {{ product.category }} / {{ formatCurrency(product.price) }} /
              {{ product.stock }} un.
            </p>
          </div>
          <div class="table-actions">
            <button class="secondary-button" type="button" @click="editProduct(product)">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="danger-button" type="button" @click="removeProduct(product.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </section>


    <section id="clientes" class="page-section" :class="{ 'crud-layout': editingClientId }">
      <form v-if="editingClientId" class="crud-panel" @submit.prevent="saveClient">
        <div class="page-header">
          <div>
            <h2>Editar cliente</h2>
            <p>Altere os dados do cliente.</p>
          </div>
        </div>

        <div class="form-grid">
          <label class="form-field">
            Nome
            <input v-model="clientForm.name" required />
          </label>
          <label class="form-field">
            Email
            <input v-model="clientForm.email" type="email" required />
          </label>
          <label class="form-field">
            Telefone
            <input v-model="clientForm.phone" />
          </label>
          <label class="form-field">
            Cidade
            <input v-model="clientForm.city" />
          </label>
          <label class="form-field">
            Status
            <select v-model="clientForm.status">
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
          <button class="secondary-button" type="button" @click="resetClientForm">
            Cancelar
          </button>
        </div>
      </form>

      <div class="crud-panel">
        <div class="page-header">
          <div>
            <h2>Clientes cadastrados</h2>
            <p>{{ clientList.length }} clientes.</p>
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
