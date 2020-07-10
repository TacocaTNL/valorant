<template>
  <div id="sidebar" class="">
    <select v-model="selectedAgent">
      <option
        v-for="agent in agents"
        :key="agent.name"
        :value="agent.name"
        selected
      >
        {{ agent.name }}
      </option>
    </select>
    <select id="subtype" class="subtype" name="subtype">
      <option v-for="suboption in suboptions" :key="suboption">
        {{ suboption }}
      </option>
    </select>
  </div>
  <img class="map-img" :src="`/img/${mapName}_map.png`" alt="" />
</template>

<script>
export default {
  data() {
    return {
      selectedAgent: 'Sova',
      agents: [
        {
          name: 'Sova',
          options: ['Shock Darts', 'Recon darts'],
        },
        {
          name: 'Sage',
          options: [],
        },
        {
          name: 'Jett',
          options: [],
        },
        {
          name: 'Rage',
          options: [],
        },
      ],
    };
  },
  computed: {
    mapName() {
      return this.$route.params.name;
    },
    suboptions() {
      return this.agents.find((agent) => agent.name === this.selectedAgent)
        .options;
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
