import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
    {
      path: "/listagem",
      name: "listagem",
      component: () => import("@/views/listagem.vue"),
    },
    {
      path: "/produtos/:id",
      name: "detalhes",
      component: () => import("@/views/detalhes.vue"),
    },
    {
      path: "/carrinho",
      name: "carrinho",
      component: () => import("@/views/carrinho.vue"),
    },
    {
      path: "/admin/produtos",
      name: "admin-produtos",
      component: () => import("@/views/adminProdutos.vue"),
    },
    {
      path: "/clientes",
      name: "clientes",
      component: () => import("@/views/novoClientes.vue"),
    },
  ],
});

export default router;
