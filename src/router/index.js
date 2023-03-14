import { createWebHistory, createRouter } from "vue-router";
import { privateRouteMiddleware } from "./middlewares";
import store from "@/store";

import dashboardChildren from "./children/dashboard-children";

const AppHomepage = () => import("@/components/AppHomepage.vue");
const Dashboard = () => import("@/components/Dashboard.vue");
const AppLogout = () => import("@/components/AppLogout.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHomepage,
    meta: {
      public: true,
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("user/refreshCurrentUser");
      next();
    },
    children: dashboardChildren,
  },
  {
    path: "/logout",
    name: "logout",
    component: AppLogout,
    meta: {
      public: true,
    },
    // beforeEnter: (to, from, next) => {
    //   store.dispatch("user/logoutUser");
    //   store.dispatch("notification/showSuccessNotification", "logoutSuccess");
    //   next({ name: "home" });
    // },
  },
  {
    path: "/:catchAll(.*)",
    component: AppHomepage,
    meta: {
      public: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  privateRouteMiddleware(to, from, next);
});

export default router;
