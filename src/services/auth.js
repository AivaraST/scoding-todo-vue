import axios from "axios";
import store from "@/store";
import router from "../router";

const AuthServices = {
  authUnauthorized() {
    axios.interceptors.request.use(
      config => {
        const token = store.getters["auth/token"];

        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          store.dispatch("auth/logout");
        }

        if (statusCode === 403) {
          router.push({ name: "Home" });
        }

        return Promise.reject(error);
      }
    );
  },

  authRouteMiddleware(router) {
    router.beforeEach((to, from, next) => {
      const requiredAuthorization = to.meta.requiredAuthorization;
      const requiredRoles = to.meta.requiredRoles;
      const authenticated = store.getters["auth/authenticated"];

      if (!authenticated) {
        store
          .dispatch("auth/attempt")
          .then(() => {
            const admin = store.getters["auth/user"].admin;

            if (requiredAuthorization === false) {
              return next({ name: "Home" });
            }

            if (requiredRoles && requiredRoles === "admin" && !admin) {
              return next({ name: "Home" });
            }

            next();
          })
          .catch(() => {
            if (requiredAuthorization === true) {
              return next({ name: "Login" });
            }

            next();
          });
      } else {
        next();
      }
    });
  }
};

export default AuthServices;
