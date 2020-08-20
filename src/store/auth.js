import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem("jwt_auth_token") || null,
    user: JSON.parse(localStorage.getItem("jwt_auth_user")) || null,
    authenticated: false,
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
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
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
    authenticated(state) {
      return state.authenticated;
    },
    loader(state) {
      return state.loader;
    },
    errors(state) {
      return state.errors;
    }
  },

  actions: {
    async login({ commit }, credentials) {
      commit("setLoader", true);

      await axios
        .post("auth/login", credentials)
        .then(response => {
          const token = response.data.access_token;
          const user = response.data.user;

          localStorage.setItem("jwt_auth_token", token);
          localStorage.setItem("jwt_auth_user", JSON.stringify(user));
          commit("setToken", token);
          commit("setUser", response.data.user);
          commit("setAuthenticated", true);

          router.push({ name: "Dashboard" });
        })
        .catch(error => {
          commit("setErrors", {});
          commit("setErrors", error.response.data.messages);
        });

      commit("setLoader", false);
    },

    async register({ commit }, credentials) {
      commit("setLoader", true);
      await axios
        .post("auth/register", credentials)
        .then(() => {
          commit("setErrors", {});
          router.push({ name: "Login", params: { registered: true } });
        })
        .catch(error => {
          commit("setErrors", {});
          commit("setErrors", error.response.data.messages);
        });

      commit("setLoader", false);
    },

    async attempt({ dispatch, commit, state }) {
      if (!state.token) {
        return;
      }

      await axios
        .get("auth/user")
        .then(response => {
          localStorage.setItem("jwt_auth_user", JSON.stringify(response.data));
          commit("setUser", response.data);
          commit("setAuthenticated", true);
        })
        .catch(() => {
          dispatch("logout");
        });
    },

    async logout({ commit }) {
      localStorage.removeItem("jwt_auth_token");
      localStorage.removeItem("jwt_auth_user");

      commit("setToken", null);
      commit("setUser", null);
      commit("setAuthenticated", false);

      axios.defaults.headers.common["Authorization"] = "";

      router.push({ name: "Home" }).catch(() => {});

      await axios.post("auth/logout");
    }
  }
};
