<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormContainer",
  methods: {
    submit(e) {
      console.log(e.form);
    }
  }
};
</script>

<style scoped>
.form {
  display: block;
  background-color: #fff;
  padding: 50px 75px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
