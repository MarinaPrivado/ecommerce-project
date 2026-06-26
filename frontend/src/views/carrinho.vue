<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency, products } from '@/data/catalog'

const cart = reactive(
  products.slice(0, 3).map((product, index) => ({
    ...product,
    quantity: index + 1,
  })),
)

const subtotal = computed(() =>
  cart.reduce((total, item) => total + item.price * item.quantity, 0),
)
const shipping = computed(() => (subtotal.value >= 299 ? 0 : 29.9))
const total = computed(() => subtotal.value + shipping.value)

const increase = (id: number) => {
  const item = cart.find((cartItem) => cartItem.id === id)
  if (item) item.quantity += 1
}

const decrease = (id: number) => {
  const item = cart.find((cartItem) => cartItem.id === id)
  if (item && item.quantity > 1) item.quantity -= 1
}
</script>

<template>
  <section class="page-hero">
      <RouterLink class="ghost-button" to="/listagem">
        <i class="pi pi-arrow-left"></i>
        Continuar comprando
      </RouterLink>
      <h1>Carrinho de <span>compras</span></h1>
      
    </section>

    <section class="page-section cart-layout">
      <div class="cart-card">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-icon">
            <i class="pi" :class="item.icon"></i>
          </div>
          <div>
            <strong>{{ item.name }}</strong>
            <p class="muted">{{ item.brand }} / {{ formatCurrency(item.price) }}</p>
            <div class="quantity-control" aria-label="Controle de quantidade">
              <button type="button" @click="decrease(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="increase(item.id)">+</button>
            </div>
          </div>
          <strong>{{ formatCurrency(item.price * item.quantity) }}</strong>
        </div>
      </div>

      <aside class="summary-card">
        <h2>Resumo do pedido</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <strong>{{ formatCurrency(subtotal) }}</strong>
        </div>
        <div class="summary-row">
          <span>Frete</span>
          <strong>{{ shipping === 0 ? 'Grátis' : formatCurrency(shipping) }}</strong>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <strong>{{ formatCurrency(total) }}</strong>
        </div>
        <RouterLink class="primary-button" to="/login">
          Finalizar compra
          <i class="pi pi-arrow-right"></i>
        </RouterLink>
      </aside>
    </section>
</template>
