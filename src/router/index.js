import { createWebHistory, createRouter } from "vue-router";
import { privateRouteMiddleware } from "./middlewares";

// import appChildren from "./children/app-children";

const Homepage = () => import("@/components/Homepage.vue");
const Dashboard = () => import("@/components/Dashboard.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Homepage,
    meta: {
      public: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    // children: dashboardChildren,
  },
  {
    path: "/:catchAll(.*)",
    component: Homepage,
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
