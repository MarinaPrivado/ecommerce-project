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
  ],
});

export default router;
