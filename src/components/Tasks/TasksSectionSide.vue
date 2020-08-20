<template>
  <div class="tasks__section">
    <div class="tasks__section-name" :class="getLabel">{{ upperLabel }}</div>
    <div class="tasks__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TasksSectionSide",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    upperLabel: function() {
      return this.label.toUpperCase();
    },
    getLabel: function() {
      return "tasks__section-name--" + this.label;
    }
  }
};
</script>

<style lang="scss" scoped>
.tasks {
  &__section {
    width: 100%;
    margin: 20px 0;
    padding: 0 0;
    position: relative;
  }
  &__section-name {
    padding: 5px;
    display: inline-block;
    border-radius: 5px;
    color: #f9fff9;

    &--assigned {
      background-color: #ff8189;
    }
    &--inprogress {
      background-color: #fdd37a;
    }
    &--done {
      background-color: #d0ec99;
    }
  }
  &__inner {
    min-height: 100px;
    padding: 10px 0;
    background-color: #fff;
  }
}
</style>
