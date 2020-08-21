import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem("jwt_auth_token") || null,
    user: JSON.parse(localStorage.getItem("jwt_auth_user")) || null,
    authenticated: false
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
    }
  },

  actions: {
    async login({ commit }, credentials) {
      await axios
        .post("auth/login", credentials)
        .then(response => {
          const token = response.data.access_token;
          const user = response.data.user;

          localStorage.setItem("jwt_auth_token", token);
          localStorage.setItem("jwt_auth_user", JSON.stringify(user));

          commit("setToken", token);
          commit("setUser", user);
          commit("setAuthenticated", true);

          router.push({ name: "Dashboard" });
        })
        .catch(error => {
          throw new AuthException(error.response.data);
        });
    },

    async register(_, credentials) {
      await axios
        .post("auth/register", credentials)
        .then(() => {
          router.push({ name: "Login", params: { registered: true } });
        })
        .catch(error => {
          throw new AuthException(error.response.data);
        });
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
          throw "Auth failed";
        });
    },

    async logout({ commit }) {
      router.push({ name: "Home" }).catch(() => {});
      commit("setAuthenticated", false);

      await axios.post("auth/logout");

      localStorage.removeItem("jwt_auth_token");
      localStorage.removeItem("jwt_auth_user");
      commit("setToken", null);
      commit("setUser", null);

      axios.defaults.headers.common["Authorization"] = "";
    }
  }
};

function AuthException(data) {
  if (data.error) {
    this.data = { single: data.error };
  } else {
    const keys = Object.keys(data.messages);
    const values = Object.values(data.messages);
    let errorMessages = {};

    for (let i = 0; i < keys.length; i++) {
      errorMessages[keys[i]] = values[i][0];
    }
    this.data = errorMessages;
  }
}
