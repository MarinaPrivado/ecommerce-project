<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '@/img/nexvolt_logo.svg'
import { categories, formatCurrency, products, type Product } from '@/data/catalog'

const featuredProduct = products[0] as Product
</script>

<template>
  <main class="store-shell">
    <div class="store-topbar">
      <i class="pi pi-bolt" aria-hidden="true"></i>
      <span>Entrega rapida para compras acima de R$ 299</span>
    </div>

    <nav class="store-nav" aria-label="Navegacao principal">
      <RouterLink class="store-logo" to="/">
        <img :src="logo" alt="NexVolt" />
      
      </RouterLink>

      <div class="store-links" >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/listagem">Produtos</RouterLink>
        <RouterLink to="/carrinho">Carrinho</RouterLink>
      
      </div>

      <div class="store-actions">
        <RouterLink class="icon-button" to="/login" aria-label="Login">
          <i class="pi pi-user"></i>
        </RouterLink>
        <RouterLink class="icon-button" to="/carrinho" aria-label="Carrinho">
          <i class="pi pi-shopping-cart"></i>
        </RouterLink>
      </div>
    </nav>

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
          <RouterLink class="ghost-button" to="/admin/produtos">
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
            <h2>{{ featuredProduct.name }}</h2>
            <div class="price-row">
              <span class="price">{{ formatCurrency(featuredProduct.price) }}</span>
              <span class="old-price">{{ formatCurrency(featuredProduct.oldPrice || 0) }}</span>
            </div>
          </div>
          <RouterLink class="primary-button" :to="`/produtos/${featuredProduct.id}`">
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

    

    <footer class="footer">
      <div>
        <strong>NexVolt</strong>
        <p>Projeto e-commerce.</p>
      </div>
      <div>
        <strong>Loja</strong>
        <RouterLink to="/listagem">Produtos</RouterLink>
        <RouterLink to="/carrinho">Carrinho</RouterLink>
      </div>
      <div>
        <strong>Sistema</strong>
        <RouterLink to="/admin/produtos">Admin</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
      </div>
      <div>
        <strong>Conta</strong>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </footer>
  </main>
</template>
