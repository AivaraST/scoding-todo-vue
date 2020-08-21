<template>
  <div class="container wrapper">
    <form @submit.prevent="updateUser">
      <FormContainer>
        <FormTitle>Edit user</FormTitle>
        <FormDescription
          >Please enter new user details, and press edit.</FormDescription
        >
        <FormInput
          name="name"
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

        <FormSuccess v-if="success"
          >Congratulations, user was updated.</FormSuccess
        >

        <FormButton color="primary" :block="true"
          >Edit <i v-if="loader" class="fas fa-spinner fa-spin"></i
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
        name: "",
        email: ""
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
    async fetchUser() {
      await axios.get(`admin/users/${this.$route.params.id}`).then(response => {
        const { name, email } = response.data;

        this.credentials.name = name;
        this.credentials.email = email;
      });
    },
    async updateUser() {
      this.loader = true;
      this.errors = {};
      this.success = false;
      await axios
        .put(`admin/users/${this.$route.params.id}`, this.credentials)
        .then(() => {
          this.success = true;
        })
        .catch(error => {
          this.errors = error.response.data.messages;
        });
      this.loader = false;
    }
  },
  mounted() {
    this.fetchUser();
  }
};
</script>
