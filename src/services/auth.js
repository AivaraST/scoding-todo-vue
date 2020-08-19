import axios from "axios";
import store from "@/store";

const authFailed = () => {
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
};

const authInitial = () => {
  store.dispatch("auth/attempt");
};

export { authFailed, authInitial };
