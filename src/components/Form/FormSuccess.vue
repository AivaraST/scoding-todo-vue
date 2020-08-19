<template>
  <span class="form__success"><slot></slot></span>
</template>

<script>
export default {};
</script>

<style>
.form__success {
  display: block;
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 30px;
  /* text-align: center; */
  color: #3bafa0;
}
</style>
