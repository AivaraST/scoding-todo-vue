<template>
  <div class="input">
    <div class="input__main">
      <textarea
        class="input__typing"
        :class="value.length ? 'input__typing--active' : ''"
        :id="name + '_rmcm'"
        :type="type"
        :value="value"
        @input="inputEvent"
        @change="onChange"
        autocomplete="off"
      />
      <label class="input__label" :for="name + '_rmcm'"><slot></slot></label>
    </div>
    <span v-if="error" class="input__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    value: {
      type: String
    },
    error: {
      required: false,
      default: ""
    }
  },
  methods: {
    inputEvent(e) {
      this.$emit("input", e.target.value);
    },
    onChange(e) {
      this.$emit("change", this.value, e);
    }
  }
};
</script>

<style lang="scss">
.input {
  margin-bottom: 25px;

  &__main {
    position: relative;
  }

  &__typing {
    display: block;
    background-color: #f4f8f7;
    width: 100%;
    padding: 15px 15px;
    outline: none;
    border: none;
    border-radius: 3px;
    color: #757675;
    resize: vertical;

    &:focus,
    &--active {
      & + .input__label {
        top: -10px;
        left: 0px;
        font-size: 12px;
      }
    }
  }

  &__label {
    display: block;
    position: absolute;
    color: #757675;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    transition: 0.5s top ease-in-out, 0.5s left ease-in-out,
      0.5s transform ease-in-out, 0.5s font-size ease-in-out;
  }

  &__error {
    display: block;
    font-size: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    color: #e26a6a;
  }
}
</style>
