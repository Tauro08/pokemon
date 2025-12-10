import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "map",
      component: () => import("../views/MapView.vue"),
    },
    {
      path: "/zone/:id",
      name: "zone",
      component: () => import("../views/ZoneView.vue"),
    },
    {
      path: "/missions",
      name: "missions",
      component: () => import("../views/MissionsView.vue"),
    },
    {
      path: "/pvp",
      name: "pvp",
      component: () => import("../views/pvpView.vue"),
    }
  ],
});

export default router;