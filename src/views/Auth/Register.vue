<template>
  <div class="container wrapper">
    <form class="form" autocomplete="off" @submit.prevent="submit">
      <div class="form__left">
        <h1 class="form__title">Already have account?</h1>
        <p class="form__info">
          Login to to our site, and continue the journey with us!
        </p>
        <FormLink color="transparent" :to="{ name: 'Login' }"
          >Sign In
        </FormLink>
      </div>
      <div class="form__right">
        <h1 class="form__title form__title--green">Create Account</h1>
        <p class="form__info">
          Please enter your credentials to register new account.
        </p>
        <FormInput name="name" :error="errors.name" v-model="credentials.name"
          >Name</FormInput
        >
        <FormInput
          name="email"
          type="email"
          :error="errors.email"
          v-model="credentials.email"
          >Email</FormInput
        >
        <FormInput
          name="password"
          type="password"
          :error="errors.password"
          v-model="credentials.password"
          >Password</FormInput
        >
        <FormInput
          name="password_repeat"
          type="password"
          :error="errors.password_repeat"
          v-model="credentials.password_repeat"
          >Repeat password</FormInput
        >
        <FormButton color="primary"
          >Register <i v-if="loader" class="fas fa-spinner fa-spin"></i
        ></FormButton>
      </div>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/Form/FormInput.vue";
import FormButton from "@/components/Form/FormButton.vue";
import FormLink from "@/components/Form/FormLink.vue";
import { mapActions } from "vuex";
import "@/assets/styles/auth.scss";

export default {
  name: "register",
  components: {
    FormInput,
    FormButton,
    FormLink
  },
  data: () => {
    return {
      credentials: {
        name: "",
        email: "",
        password: "",
        password_repeat: ""
      },
      loader: false,
      errors: {}
    };
  },
  methods: {
    ...mapActions({
      register: "auth/register"
    }),
    async submit() {
      if (this.loader) return;

      this.loader = true;
      await this.register(this.credentials).catch(error => {
        this.errors = error.data;
      });
      this.loader = false;
    }
  }
};
</script>
