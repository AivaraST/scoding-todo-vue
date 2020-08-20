import axios from "axios";
import store from "@/store";

const AuthServices = {
  authUnauthorized() {
    axios.interceptors.request.use(
      config => {
        const token = store.getters["auth/token"];

        config.headers.Authorization = token ? `Bearer${token}` : "";
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
        return Promise.reject(error);
      }
    );
  },

  authRouteMiddleware(router) {
    router.beforeEach((to, from, next) => {
      const requiredAuthorization = to.meta.requiredAuthorization;

      if (!store.getters["auth/authenticated"]) {
        store
          .dispatch("auth/attempt")
          .then(() => {
            const authenticated = store.getters["auth/authenticated"];

            if (requiredAuthorization === false && authenticated) {
              return next({ name: "Home" });
            }

            if (requiredAuthorization && !authenticated) {
              return next({ name: "Login" });
            }

            next();
          })
          .catch(next());
      } else {
        if (requiredAuthorization === false) {
          return next({ name: "Home" });
        }
        next();
      }
    });
  }
};

export default AuthServices;
