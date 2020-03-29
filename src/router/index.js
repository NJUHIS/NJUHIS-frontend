import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";

import FinStat from "../components/FinStat.vue";
import PatStat from "../components/PatStat.vue";
import Staff from "../components/Staff.vue";
import My from "../components/My.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        redirect: "/finstat"
      },
      {
        path: "/finstat",
        component: FinStat
      },
      {
        path: "/patstat",
        component: PatStat
      },
      {
        path: "/staff",
        component: Staff
      },
      {
        path: "/my",
        component: My
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
