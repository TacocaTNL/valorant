<template>
  <div id="sidebar" class="">
    <select id="agents" class="agents" name="agents">
      <option value="sova" selected>Sova</option>
      <option value="jett">Jett</option>
      <option value="sage">Sage</option>
      <option value="rage">Rage</option>
    </select>
    <select id="subtype" class="subtype" name="subtype"></select>
  </div>
  <img class="map-img" :src="`/img/${name}_map.png`" alt="" />
</template>

<script>
export default {
  computed: {
    name() {
      return this.$route.params.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  &-img {
    max-height: calc(100vh - 75px);
    max-width: 100vw;
  }
}

#sidebar {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  top: 75px;
  bottom: 0;
  left: 0;
  right: calc(100% - 70px);
  padding: 5px;
  background-color: black;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    top: calc(100% - 70px);
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
  }
}
</style>