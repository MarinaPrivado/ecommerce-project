import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", 
      component: () => import("@/views/home.vue"), 
      meta: { layout: "default" } 
  },
    { path: "/listagem",
      name: "listagem", 
      component: () => import("@/views/listagem.vue"), 
      meta: { layout: "default" } 
  },
    { path: "/produtos/:id", 
      name: "detalhes", 
      component: () => import("@/views/detalhes.vue"), 
     meta: { layout: "default" }
   },
    { path: "/carrinho", 
      name: "carrinho", 
      component: () => import("@/views/carrinho.vue"), 
      meta: { layout: "default" } 
    },
    { path: "/admin/produtos", 
      name: "admin-produtos", 
      component: () => import("@/views/adminProdutos.vue"), 
      meta: { layout: "default" }
     },
    { path: "/clientes",
      name: "clientes", 
      component: () => import("@/views/novoClientes.vue"), 
      meta: { layout: "default" } 
    },
    { path: "/login", 
      name: "login", 
      component: () => import("@/views/login.vue"), 
      meta: { layout: "guest" } 
    },
    { path: "/signup", 
      name: "signup", 
      component: () => import("@/views/signup.vue"), 
      meta: { layout: "guest" } 
    },
    { path: "/:pathMatch(.*)*", 
      name: "notFound", 
      component: () => import("@/views/NotFound.vue"), 
      meta: { layout: "guest" },
    },
  ],
});

export default router;
