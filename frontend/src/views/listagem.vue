<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { categories, formatCurrency, products } from '@/data/catalog'


const search = ref('')
const selectedCategory = ref('Todos')

const filteredProducts = computed(() =>
  products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'Todos' || product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  }),
)
</script>

<template>
  <main class="store-shell">
    <section class="page-hero">
      <RouterLink class="ghost-button" to="/">
        <i class="pi pi-arrow-left"></i>
        Home
      </RouterLink>
      <h1>Vitrine de <span>produtos</span></h1>
      <p>
        Pagina estatica da etapa 1 com listagem, filtros visuais e navegacao
        para detalhes e carrinho.
      </p>
    </section>

    <section class="page-section">
      <div class="filters">
        <input
          v-model="search"
          class="search-input"
          type="search"
          placeholder="Buscar produto"
          aria-label="Buscar produto"
        />
        <button
          class="secondary-button"
          :class="{ 'primary-button': selectedCategory === 'Todos' }"
          type="button"
          @click="selectedCategory = 'Todos'"
        >
          Todos
        </button>
        <button
          v-for="category in categories"
          :key="category.name"
          class="secondary-button"
          :class="{ 'primary-button': selectedCategory === category.name }"
          type="button"
          @click="selectedCategory = category.name"
        >
          {{ category.name }}
        </button>
      </div>

      <div class="product-grid">
        <article v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <span v-if="product.badge" class="badge">{{ product.badge }}</span>
            <i class="pi" :class="product.icon"></i>
          </div>
          <div class="product-info">
            <span class="muted">{{ product.brand }} / {{ product.category }}</span>
            <h3>{{ product.name }}</h3>
            <span class="rating">{{ product.rating }} / 5</span>
            <div class="price-row">
              <span class="price">{{ formatCurrency(product.price) }}</span>
              <span v-if="product.oldPrice" class="old-price">
                {{ formatCurrency(product.oldPrice) }}
              </span>
            </div>
            <div class="hero-actions">
              <RouterLink class="primary-button" :to="`/produtos/${product.id}`">
                Detalhes
              </RouterLink>
              <RouterLink class="secondary-button" to="/carrinho" aria-label="Ir para carrinho">
                <i class="pi pi-shopping-cart"></i>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
