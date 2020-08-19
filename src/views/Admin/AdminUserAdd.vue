<template>
  <div class="container wrapper">
    <form @submit.prevent="addUser">
      <FormContainer>
        <FormTitle>Add user</FormTitle>
        <FormDescription
          >Please enter new user details, and press add.</FormDescription
        >
        <FormInput
          name="text"
          type="text"
          :error="getErrorMessage('name')"
          v-model="credentials.name"
          >Name</FormInput
        >
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
        <FormInput
          name="password_repeat"
          type="password"
          :error="getErrorMessage('password_repeat')"
          v-model="credentials.password_repeat"
          >Password repeat</FormInput
        >

        <FormSuccess v-if="success"
          >Congratulations, user was created.</FormSuccess
        >
        <FormButton color="primary" :block="true"
          >Add <i v-if="loader" class="fas fa-spinner fa-spin"></i
        ></FormButton>
      </FormContainer>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import FormContainer from "@/components/Form/FormContainer.vue";
import FormTitle from "@/components/Form/FormTitle.vue";
import FormDescription from "@/components/Form/FormDescription.vue";
import FormInput from "@/components/Form/FormInput.vue";
import FormSuccess from "@/components/Form/FormSuccess.vue";
import FormButton from "@/components/Form/FormButton.vue";

export default {
  components: {
    FormContainer,
    FormTitle,
    FormDescription,
    FormInput,
    FormSuccess,
    FormButton
  },
  data() {
    return {
      credentials: {
        email: "",
        name: "",
        password: "",
        password_repeat: ""
      },
      loader: false,
      errors: {},
      success: false
    };
  },
  methods: {
    getErrorMessage(key) {
      if (this.errors[key]) {
        return this.errors[key][0];
      }
      return "";
    },
    async addUser() {
      this.errors = {};
      this.success = false;
      await axios
        .post("admin/users", this.credentials)
        .then(() => {
          this.success = true;
          this.credentials.email = "";
          this.credentials.name = "";
          this.credentials.password = "";
          this.credentials.password_repeat = "";
        })
        .catch(error => {
          this.errors = error.response.data.messages;
        });
      this.loader = false;
    }
  }
};
</script>
