<template>
  <div id="sidebar">
    <button href="#" class="close-btn" @click="activeSidebar">
      <div class="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-justified" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
      </div>
      <div class="btn-text">Close</div>
    </button>
    <button type="button" class="accordion" @click="activeAccordion">
      <div class="btn-icon" @click.prevent="activeAccordion">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="2" />
          <line x1="15" y1="8" x2="17" y2="8" />
          <line x1="15" y1="12" x2="17" y2="12" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      </div>
      <div v-if="!selectedAgent" class="btn-text">Choose an agent</div>
      <div v-else class="btn-text" @change.self="setPoints">{{selectedAgent}}</div>
    </button>
    <div class="panel">
      <div class="list-item" v-for="agent in agents" :key="agent.name" @click="selectedAgent = agent.name">{{agent.name}}</div>
    </div>
    <button v-if="selectedAgent" type="button" class="accordion" @click="activeAccordion">
      <span class="btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M18 15a6 6 0 1 1 -10.853 -3.529c1.926-2.338 4.763-3.327 3.848-8.47 2.355 1.761 5.84 5.38 2.022 9.406-1.136 1.091-.244 2.767 1.221 2.593.882-.105 2.023-.966 3.23-2.3.532.68.532 1.717.532 2.3z" />
        </svg>
      </span>
      <span v-if="!selectedAbility" class="btn-text">Choose an ability</span>
      <span v-else class="btn-text" @change="setPoints">{{selectedAbility}}</span>
    </button>
    <div class="panel">
      <div class="list-item" v-for="ability in abilities" :key="ability" @click="selectedAbility = ability">{{ability}}</div>
    </div>
    <button type="button" class="accordion" @click="activeAccordion">
      <span class="btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-switch-horizontal" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <polyline points="16 3 20 7 16 11" />
          <line x1="10" y1="7" x2="20" y2="7" />
          <polyline points="8 13 4 17 8 21" />
          <line x1="4" y1="17" x2="13" y2="17" />
        </svg>
      </span>
      <span v-if="!selectedSide" class="btn-text">Choose a side</span>
      <span v-else class="btn-text" @change="setPoints">{{selectedSide}}</span>
    </button>
    <div class="panel">
      <div class="list-item" v-for="side in sides" :key="side" @click="selectedSide = side">{{side}}</div>
    </div>
  </div>

  <Svg id="map-img" class="map-img" />
  <!-- <object id="map-img" class="map-img" :data="`/img/${mapName}_map.svg`" type="image/svg+xml"></object> -->

  <Modal class="modal" />
</template>

<script>
import Modal from '../components/modal.vue';
import Svg from '../components/svg.vue';

export default {
  data() {
    return {
      selectedAgent: '',
      selectedAbility: '',
      selectedSide: '',
      sides: ['Attackers','Defenders'],
      agents: [
        {
          name: 'Sova',
          options: ['Shock Darts', 'Recon Darts'],
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
      points: [
        {
          map: 'ascent',
          pointData: [
            {
              name: 'Shock Darts',
              attackers: [[686,371],[555,1652]],
              defenders: [[]]
            },
            {
              name: 'Recon Darts',
              attackers: [[510, 139],[731,652],[584,856],[748,935],[388,1394]], //Coordinates from Illustrator file * (2047.2/722.354) and rounded
              defenders: [[1102,1545],[1445,547]] //Coordinates from Illustrator file * (2047.2/722.354) and rounded
            }
          ]
        },
        {
          map: 'bind',
          pointData: [
            {
              name: 'Shock Darts',
              attackers: [],
              defenders: []
            },
            {
              name: 'Recon Darts',
              attackers: [],
              defenders: []
            }
          ]
        },
        {
          map: 'haven',
          pointData: [
            {
              name: 'Shock Darts',
              attackers: [],
              defenders: []
            },
            {
              name: 'Recon Darts',
              attackers: [],
              defenders: []
            }
          ]
        },
        {
          map: 'split',
          pointData: [
            {
              name: 'Shock Darts',
              attackers: [],
              defenders: []
            },
            {
              name: 'Recon Darts',
              attackers: [],
              defenders: []
            }
          ]
        }
      ]
    };
  },
  components: {
    Modal,
    Svg
  },
  methods: {
    openModal() {
      return alert('open!');
    },
    test() {
      alert('test');
    },
    setPoints() {
      var map = this.$route.path.split('/')[2];
      var svg_object = document.getElementById('map-img');
      var agent = this.selectedAgent;
      var ability = this.selectedAbility;
      var side = this.selectedSide.toLowerCase();
      if (agent && ability && side) {
        var svg_id = (agent + ability).split(' ')[0];
        var coords = this.points.find(curMap => curMap.map === map).pointData.find(curAbil => curAbil.name === ability)[side]; // Get point array with x- and y-coordinates
        var point_offset = 30; //set offset of polygon points from center

        for (var i = 0; i < svg_object.getElementsByClassName('side').length; i++) {
          svg_object.getElementsByClassName('side')[i].style.display = 'none';
        }

        for (var i = 0; i < coords.length; i++) {
          //define four points of rhombus:
          var rhombus1 = (coords[i][0] - point_offset) + ',' + coords[i][1];
          var rhombus2 = coords[i][0] + ',' + (coords[i][1] + point_offset);
          var rhombus3 = (coords[i][0] + point_offset) + ',' + coords[i][1];
          var rhombus4 = coords[i][0] + ',' + (coords[i][1] - point_offset);

          var style_options =
          'fill: rgba(255, 255, 255, 0);' +
          'stroke: #EC5964;' +
          'stroke-width: 8px;' +
          'cursor: pointer;' +
          'transition: 0.2s ease-out';

          var style_options2 =
          'fill: #EC5964;' +
          'stroke: #EC5964;' +
          'stroke-width: 8px;' +
          'cursor: pointer;' +
          'transition: 0.2s ease-out';

          //create polygon shape: e.g. for a rhombus around (10,10): <polygon points="0,10 10,20 20,10, 10,0" style="stroke:purple;stroke-width:1">
          var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          polygon.setAttributeNS(null,'points', rhombus1 + ' ' + rhombus2 + ' ' + rhombus3 + ' ' + rhombus4);
          polygon.setAttributeNS(null,'class','polygon');
          polygon.setAttributeNS(null,'style',style_options);
          polygon.addEventListener('click',function(){document.getElementsByClassName('modal')[0].style.display = 'flex'});
          polygon.addEventListener('mouseover', function(){this.setAttributeNS(null,'style',style_options2);});
          polygon.addEventListener('mouseout', function(){this.setAttributeNS(null,'style',style_options);});

          svg_object.getElementById(svg_id).querySelector('.'+ side).appendChild(polygon);
        }

        var svg_points = svg_object.getElementById(svg_id).querySelector('.'+side);
        if (svg_points.style.display === 'none') {
          svg_points.style.display = "inline";
        } else {
          svg_points.style.display = "none";
        }
      }
    },
    activeSidebar() {
      var sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('active');

      if (!(sidebar.classList.contains('active'))) {
        for (var i = 0; i < document.getElementsByClassName('accordion').length; i++) {
          document.getElementsByClassName('accordion')[i].classList.remove('active');
          document.getElementsByClassName('panel')[i].style.display = 'none';
        }
      }

    },
    activeAccordion() {
      event.target.classList.toggle("active");
      var panel = event.target.nextElementSibling;
      if (panel.style.display === "flex") {
        panel.style.display = "none";
      } else {
        panel.style.display = "flex";
      }
    }
  },
  computed: {
    mapName() {
      return this.$route.params.name;
    },
    abilities() {
      if (this.selectedAgent) {
        return this.agents.find((agent) => agent.name === this.selectedAgent).options;
      }
    },
  },
  watch: {
    selectedAgent: function() {
      this.setPoints();
    },
    selectedAbility: function() {
      this.setPoints();
    },
    selectedSide: function() {
      this.setPoints();
    },
  }
};
</script>

<style lang="scss" scoped>
.map-img {
  max-height: calc(100vh - 75px);
  max-width: 100vw;
}

select {
  background-color: black;
  color: white;
  border: 0;
  font-family: Rubik;
  padding: 10px;

  option {
    font-family: Rubik;
  }
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px;
  border: 0;
  border-bottom: 2px solid #000000;
  cursor: pointer;
  font-family: Rubik;
  color: #FFFFFF;
  background-color: #000000;

  &:hover {
    border-bottom-color: #FF4655;
  }
}

.accordion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px;
  border: 0;
  border-bottom: 2px solid #000000;
  cursor: pointer;
  font-family: Rubik;
  color: #FFFFFF;
  background-color: #000000;

  &:hover {
    border-bottom-color: #FF4655;
  }

  .btn-icon {
    pointer-events: none;
  }
}

.panel {
  display: none;
  flex-flow: column nowrap;
  align-items: center;
  overflow: hidden;
  color: white;

  .list-item {
    width: 100%;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;

    &:hover {
      background-color: #333333;
    }
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
  background-color: black;
  transition: 0.3s ease-out;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    top: calc(100% - 70px);
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
  }

  .icon {
    flex: 0 0 auto;
  }

  .sidebar-li {
    display: none;
    width: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .btn-text {
    display: none;
    margin: auto;
    pointer-events: none;
  }
}

#sidebar.active {
  right: calc(100% - 200px);
  transition: 0.3s ease-out;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
    padding: 1rem;
  }

  .sidebar-li {
    display: flex;
    flex: 1 1 auto;
    color: white;

    &:active, &:visited, &:focus {
      color: white;
      text-decoration: none;
    }
  }

  .accordion {
    &:after {
      content: '\2795';
      font-size: 13px;
      color: #FFFFFF;
      margin-left: 5px;
    }

    &.active:after {
      content: '\2796';
    }
  }

  .btn-text {
    display: inline;
  }
}

.polygon {
  fill: #EC5964;
  stroke: #EC5964;
  stroke-width: 8px;
  cursor: pointer;
  transition: 0.2s ease-out;
}

.polygon:hover {
  fill: #EC5964;
}
</style>
