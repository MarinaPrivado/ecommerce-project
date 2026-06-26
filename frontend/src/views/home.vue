<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { categories, formatCurrency, type Product } from '@/data/catalog'
import { getProducts } from '@/data/api'

const products = ref<Product[]>([])
const featuredProduct = computed(() => products.value[0])

onMounted(async () => {
  products.value = await getProducts()
})
</script>

<template>
  <section class="hero">
      <div class="hero-content">
        <span class="hero-badge">
          <i class="pi pi-sparkles"></i>
          Tecnologia selecionada
        </span>
        <h1>Eletrônicos para montar seu <span>setup ideal</span>.</h1>
        
       
        
        <div class="hero-actions">
          <RouterLink class="primary-button" to="/listagem">
            Ver produtos
            <i class="pi pi-arrow-right"></i>
          </RouterLink>
          <RouterLink class="ghost-button" to="/login">
            Área do administrador
            <i class="pi pi-arrow-right"></i>
          </RouterLink>
        </div>
        <div class="hero-stats" aria-label="Indicadores da loja">
          <div class="stat">
            <strong>80+</strong>
            <span>Produtos no catalogo</span>
          </div>
          <div class="stat">
            <strong>98%</strong>
            <span>Clientes satisfeitos</span>
          </div>
          <div class="stat">
            <strong>48h</strong>
            <span>Entrega em capitais</span>
          </div>
        </div>
      </div>

      <aside class="hero-panel" aria-label="Produto em destaque">
        <div class="device-card">
          <div class="device-visual">
            <i class="pi pi-desktop"></i>
          </div>
          <div>
            <span class="muted">Destaque da semana</span>
            <h2>{{ featuredProduct?.name }}</h2>
            <div class="price-row">
              <span class="price">{{ formatCurrency(featuredProduct?.price ?? 0) }}</span>
              <span class="old-price">{{ formatCurrency(featuredProduct?.oldPrice ?? 0) }}</span>
            </div>
          </div>
          <RouterLink class="primary-button" :to="`/produtos/${featuredProduct?.id}`">
            Ver detalhes
          </RouterLink>
        </div>
      </aside>
    </section>

    <section class="feature-strip" aria-label="Beneficios da loja">
      <div class="feature">
        <i class="pi pi-truck"></i>
        <div>
          <strong>Frete grátis</strong>
          <span>Acima de R$ 299</span>
        </div>
      </div>
      <div class="feature">
        <i class="pi pi-shield"></i>
        <div>
          <strong>Compra segura</strong>
          <span>Pagamento protegido</span>
        </div>
      </div>
      <div class="feature">
        <i class="pi pi-refresh"></i>
        <div>
          <strong>Troca simples</strong>
          <span>30 dias para devolver</span>
        </div>
      </div>
      <div class="feature">
        <i class="pi pi-headphones"></i>
        <div>
          <strong>Suporte</strong>
          <span>Atendimento especializado</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Explore por categoria</h2>
          <p class="section-subtitle">Atalhos para a primeira etapa do e-commerce</p>
        </div>
        <RouterLink class="secondary-button" to="/listagem">Ver vitrine</RouterLink>
      </div>
      <div class="category-grid">
        <RouterLink
          v-for="category in categories"
          :key="category.name"
          class="category-card"
          to="/listagem"
        >
          <i class="pi" :class="category.icon"></i>
          <strong>{{ category.name }}</strong>
          <span class="muted">{{ category.count }} produtos</span>
        </RouterLink>
      </div>
    </section>

    <section class="section section-alt">
      <div class="section-header">
        <div>
          <h2 class="section-title">Produtos em destaque</h2>
          
        </div>
        <RouterLink class="secondary-button" to="/listagem">Ver vitrine</RouterLink>
      </div>
      <div class="product-grid">
        <article v-for="product in products" :key="product.id" class="product-card">
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
            <RouterLink class="primary-button" :to="`/produtos/${product.id}`">
              Detalhes
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    

</template>
