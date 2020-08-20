import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Logout from "../views/Auth/Logout.vue";
import Dashboard from "../views/Dashboard.vue";
import AdminPage from "../views/Admin/AdminPage.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import AdminUserAdd from "../views/Admin/AdminUserAdd.vue";
import AdminUserEdit from "../views/Admin/AdminUserEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    component: Login,
    meta: {
      requiredAuthorization: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiredAuthorization: false
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiredAuthorization: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiredAuthorization: true
    }
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
    meta: {
      requiredAuthorization: true
    },
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        meta: {
          requiredAuthorization: true
        }
      },
      {
        path: "user/add",
        name: "AdminUserAdd",
        component: AdminUserAdd,
        meta: {
          requiredAuthorization: true
        }
      },
      {
        path: "user/:id/edit",
        name: "AdminUserEdit",
        component: AdminUserEdit,
        meta: {
          requiredAuthorization: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
