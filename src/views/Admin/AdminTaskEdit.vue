<template>
  <div class="container wrapper">
    <form @submit.prevent="addUser">
      <FormContainer>
        <FormTitle>Update user task</FormTitle>
        <FormDescription
          >Please enter new user task details, and press
          update.</FormDescription
        >
        <FormInput
          name="text"
          type="text"
          :error="getErrorMessage('name')"
          v-model="task.name"
          :value="task.name"
          >Name</FormInput
        >
        <FormTextarea
          name="description"
          type="description"
          :error="getErrorMessage('description')"
          v-model="task.description"
          :value="task.description"
          >Task</FormTextarea
        >

        <FormSuccess v-if="success"
          >Congratulations, task was updated.</FormSuccess
        >
        <FormButton color="primary" :block="true"
          >Update <i v-if="loader" class="fas fa-spinner fa-spin"></i
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
import FormTextarea from "@/components/Form/FormTextarea.vue";
import FormSuccess from "@/components/Form/FormSuccess.vue";
import FormButton from "@/components/Form/FormButton.vue";

export default {
  components: {
    FormContainer,
    FormTitle,
    FormDescription,
    FormInput,
    FormTextarea,
    FormSuccess,
    FormButton
  },
  data() {
    return {
      task: {
        name: "",
        description: ""
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
    async fetchTask() {
      await axios.get(`admin/tasks/${this.$route.params.id}`).then(response => {
        const { name, description } = response.data;

        this.task.name = name;
        this.task.description = description;
      });
    },
    async addUser() {
      this.errors = {};
      this.true = false;
      await axios
        .put(`admin/tasks/${this.$route.params.id}`, this.task)
        .then(() => {
          this.success = true;
          this.task.name = "";
          this.task.description = "";
        })
        .catch(error => {
          this.errors = error.response.data.messages;
        });
      this.loader = false;
    }
  },
  mounted() {
    this.fetchTask();
  }
};
</script>
