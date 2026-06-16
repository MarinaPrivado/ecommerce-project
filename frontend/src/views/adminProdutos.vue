<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency, products, type Product } from '@/data/catalog'

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
</script>

<template>
  <main class="store-shell">
    <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>CRUD do <span>admin</span></h1>
      <p>Gerenciamento inicial de produtos, pronto para conectar com a API.</p>
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
              <option>Perifericos</option>
              <option>Componentes</option>
              <option>Audio</option>
              <option>Acessorios</option>
            </select>
          </label>
          <label class="form-field">
            Icone Prime
            <input v-model="form.icon" placeholder="pi-desktop" />
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

      <div class="crud-panel">
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
  </main>
</template>
