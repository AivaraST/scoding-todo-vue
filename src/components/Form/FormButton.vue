<template>
  <button
    class="button__auth"
    :class="[buttonColorClass[color], block ? 'button__auth--block' : '']"
    @click="triggerModel"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "primary"
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => {
    return {
      buttonColorClass: {
        primary: "button__auth--primary",
        transparent: "button__auth--transparent",
        dark: "button__auth--dark"
      }
    };
  },
  methods: {
    triggerModel() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.button__auth {
  display: inline-block;
  width: auto;
  text-align: center;
  outline: none;
  text-transform: uppercase;
  border-radius: 8px;
  border: 1px solid #fff;
  padding: 15px 15px;
  text-decoration: none;
  color: #fff;
  transition: 0.3s background-color ease-in-out, 0.3s color ease-in-out;
  cursor: pointer;
  font-size: 12px;

  &--primary {
    background-color: rgba(58, 173, 161, 1);

    &:hover {
      background-color: rgb(33, 139, 129);
    }
  }

  &--dark {
    background-color: #515661;

    &:hover {
      background-color: #353b48;
    }
  }

  &--transparent {
    background-color: #ffffff00;

    &:hover {
      background-color: #fff;
      color: #757675;
    }
  }

  &--block {
    display: block;
    width: 100%;
  }
}
</style>
