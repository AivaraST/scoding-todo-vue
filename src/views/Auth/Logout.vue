<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.logout();
  },
  methods: {
    ...mapActions({
      logout: "auth/logout"
    })
  }
};
</script>

<style></style>
