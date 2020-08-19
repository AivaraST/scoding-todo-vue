import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { API_DEFAULT_URL } from "./configs";
import { authUnauthorized, authRouteMiddleware } from "./services/auth";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = API_DEFAULT_URL;

authUnauthorized();
authRouteMiddleware(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
