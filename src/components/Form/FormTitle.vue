<template>
  <h1 class="form__title form__title--green"><slot></slot></h1>
</template>

<script>
export default {};
</script>

<style scoped>
.form__title {
  font-size: 36px;
  text-align: center;
}

.form__title--green {
  color: #3bafa0;
}
</style>
