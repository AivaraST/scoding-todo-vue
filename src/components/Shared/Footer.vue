<template>
  <footer class="footer">
    <span class="footer__credits">Aivaras Stasiulis @ 2020</span>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;

  &__credits {
    color: #000;
  }
}
</style>
