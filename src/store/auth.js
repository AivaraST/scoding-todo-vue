import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem("jwt_auth_token") || null,
    user: null,
    loader: false,
    errors: {}
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoader(state, status) {
      state.loader = status;
    },
    setErrors(state, errors) {
      state.errors = errors;
    }
  },

  getters: {
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    loader(state) {
      return state.loader;
    },
    errors(state) {
      return state.errors;
    }
  },

  actions: {
    // Login
    async login({ commit }, credentials) {
      commit("setLoader", true);

      await axios
        .post("auth/login", credentials)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          const user = response.data.user;

          localStorage.setItem("jwt_auth_token", token);
          commit("setToken", token);
          commit("setUser", user);

          router.push({ name: "Dashboard" });
        })
        .catch(error => {
          commit("setErrors", {});
          commit("setErrors", error.response.data.messages);
        });

      commit("setLoader", false);
    },

    // Register
    async register({ commit }, credentials) {
      commit("setLoader", true);
      console.log("reg", credentials);
      await axios
        .post("auth/register", credentials)
        .then(() => {
          commit("setErrors", {});
          router.push({ name: "Login", params: { registered: true } });
        })
        .catch(error => {
          console.log(error.response.data.messages);
          commit("setErrors", {});
          commit("setErrors", error.response.data.messages);
        });

      commit("setLoader", false);
    },

    // Attempt login when page loaded and token exists (user already was logged in)
    async attempt({ commit, state }) {
      if (!state.token) {
        return;
      }

      axios.defaults.headers.common["Authorization"] = "Bearer" + state.token;

      await axios.get("auth/user").then(response => {
        commit("setUser", response.data.user);
      });
    },

    // Logout user
    async logout({ commit }) {
      commit("setToken", null);
      commit("setUser", null);
      localStorage.removeItem("jwt_auth_token");
      axios.defaults.headers.common["Authorization"] = "";

      router.push({ name: "Home" });
    }
  }
};
