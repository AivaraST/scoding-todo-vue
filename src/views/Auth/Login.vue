<template>
  <div class="container wrapper">
    <form class="form" @submit.prevent="submit">
      <div class="form__left">
        <h1 class="form__title">Don't have account?</h1>
        <p class="form__info">
          Register to our site, and start the journey with us!
        </p>
        <FormLink color="transparent" :to="{ name: 'Register' }"
          >Sign Up
        </FormLink>
      </div>
      <div class="form__right">
        <h1 class="form__title form__title--green">Sign in to TODO</h1>
        <p class="form__info">
          Please enter your credentials to login to your account.
        </p>
        <p v-if="registered" class="form__congrats">
          Congratulations, you registered successfully, please enter your
          credentials to log in.
        </p>
        <FormInput
          name="email"
          type="email"
          :error="getErrorMessage('email')"
          v-model="credentials.email"
          >Email</FormInput
        >
        <FormInput
          name="password"
          type="password"
          :error="getErrorMessage('password')"
          v-model="credentials.password"
          >Password</FormInput
        >
        <FormButton color="primary"
          >Login <i v-if="loader" class="fas fa-spinner fa-spin"></i
        ></FormButton>
      </div>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/Form/FormInput.vue";
import FormButton from "@/components/Form/FormButton.vue";
import FormLink from "@/components/Form/FormLink.vue";
import { mapActions, mapGetters } from "vuex";
import "@/assets/styles/auth.scss";

export default {
  name: "login",
  props: {
    registered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    FormInput,
    FormButton,
    FormLink
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      loader: "auth/loader",
      errors: "auth/errors"
    })
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    submit() {
      if (this.loader) {
        return;
      }
      this.login(this.credentials);
    },
    getErrorMessage(key) {
      if (this.errors[key]) {
        return this.errors[key][0];
      }
      return "";
    }
  }
};
</script>
