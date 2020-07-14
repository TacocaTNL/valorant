<template>
  <div class="map-container">
    <Map name="ascent" />
    <Map name="bind" />
    <Map name="haven" />
    <Map name="split" />
  </div>
</template>

<script>
import Map from '../components/mapCard.vue';

export default {
  components: {
    Map,
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 85%;
}
</style>
