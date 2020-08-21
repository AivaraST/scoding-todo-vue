<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from "@/components/Shared/Navigation.vue";
import Footer from "@/components/Shared/Footer.vue";

export default {
  components: {
    Navigation,
    Footer
  }
};
</script>
>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
}

html,
body {
  height: 100%;
}

body {
  color: #000;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background-color: #f0f4f3;
}

#app {
  position: relative;
  min-height: 100%;
  padding-bottom: 50px;
}

.container {
  max-width: 1140px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.wrapper {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
