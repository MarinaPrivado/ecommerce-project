<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { formatCurrency, products, type Product } from '@/data/catalog'

const route = useRoute()
const fallbackProduct = products[0] as Product
const product = computed<Product>(
  () => products.find((item) => item.id === Number(route.params.id)) || fallbackProduct,
)
</script>

<template>
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/listagem">
        <i class="pi pi-arrow-left"></i>
        Voltar para vitrine
      </RouterLink>
      <h1>Detalhes do <span>produto</span></h1>
      <p>Pagina de descrição, ficha técnica e chamada para adicionar ao carrinho.</p>
    </section>

    <section class="page-section">
      <article class="detail-card">
        <div class="detail-visual">
          <i class="pi" :class="product.icon"></i>
        </div>

        <div>
          <span class="eyebrow">{{ product.brand }} / {{ product.category }}</span>
          <h2>{{ product.name }}</h2>
          <p class="muted">{{ product.description }}</p>

          <div class="price-row">
            <span class="price">{{ formatCurrency(product.price) }}</span>
            <span v-if="product.oldPrice" class="old-price">
              {{ formatCurrency(product.oldPrice) }}
            </span>
          </div>

          <ul class="spec-list">
            <li v-for="spec in product.specs" :key="spec">
              <i class="pi pi-check-circle"></i>
              <span>{{ spec }}</span>
            </li>
          </ul>

          <p><strong>Estoque:</strong> {{ product.stock }} unidades disponiveis</p>
          <p><strong>Avaliacao:</strong> <span class="rating">{{ product.rating }} / 5</span></p>

          <div class="hero-actions">
            <RouterLink class="primary-button" to="/carrinho">
              <i class="pi pi-shopping-cart"></i>
              Adicionar ao carrinho
            </RouterLink>
           
          </div>
        </div>
      </article>
    </section>
</template>
