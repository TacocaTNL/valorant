<template>
  <div class="map">
    <router-link :to="`/map/${name}`">
      <img :src="`/img/${name}.png`" alt="" />
      <div class="map-overlay"></div>
      <span class="map-name">{{ name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 40%;
  margin: 25px;

  .map-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    transition: 0.5s ease-out;
    background-color: black;
  }

  &:hover .map-overlay {
    width: 100%;
  }

  img {
    width: 100%;
  }

  span {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 10px;
    color: white;
    font-weight: 600;
    font-size: 24px;
  }
}
</style>
