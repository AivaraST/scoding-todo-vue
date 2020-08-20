<template>
  <div class="tasks__section">
    <div class="tasks__section-name" :class="getLabel">{{ upperLabel }}</div>
    <div class="tasks__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
  name: "TasksSection",
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
    width: 33.33%;
    padding: 0 10px;
    position: relative;
  }
  &__section-name {
    padding: 5px;
    display: inline-block;
    border-radius: 5px;
    position: absolute;
    left: 30px;
    top: -15px;
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
    padding: 20px 10px;
    background-color: #fff;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}

@media only screen and (max-width: 767.98px) {
  .tasks {
    &__section {
      width: 50%;
      margin: 20px 0;
    }
  }
}

@media only screen and (max-width: 575.98px) {
  .tasks {
    &__section {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>
