import axios from "axios";
import store from "@/store";

const authUnauthorized = () => {
  axios.interceptors.request.use(
    config => {
      const token = store.getters["auth/token"];

      config.headers.Authorization = token ? `Bearer${token}` : "";
      console.log("Before request", config.headers.Authorization);
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

      console.log(statusCode);

      if (statusCode === 401) {
        store.dispatch("auth/logout");
      }
      return Promise.reject(error);
    }
  );
};

const authRouteMiddleware = router => {
  router.beforeEach((to, from, next) => {
    const requiredAuthorization = to.meta.requiredAuthorization;

    if (!store.getters["auth/user"]) {
      store
        .dispatch("auth/attempt")
        .then(() => {
          const user = store.getters["auth/user"];

          console.log(user);

          if (requiredAuthorization === false && user) {
            return next({ name: "Home" });
          }

          if (requiredAuthorization && !user) {
            return next({ name: "Login" });
          }

          next();
        })
        .catch({ name: "Home" });
    } else {
      next();
    }
  });
};

// const authInitial = () => {
//   store.dispatch("auth/attempt");
// };

export { authUnauthorized, authRouteMiddleware };
