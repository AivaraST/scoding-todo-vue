<template>
  <div class="tasks">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.dashboard-page {
  padding-top: 50px;
  padding-bottom: 50px;
}
.tasks {
  display: flex;
  flex-wrap: wrap;
}
</style>
