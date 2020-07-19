<template>
  <div id="sidebar">
    <a href="#" class="" @click="activeSidebar">
      <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-justified" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
      </span>
      <span class="sidebar-li">Close</span>
    </a>
    <a class="">
      <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="9" cy="10" r="2" />
            <line x1="15" y1="8" x2="17" y2="8" />
            <line x1="15" y1="12" x2="17" y2="12" />
            <line x1="7" y1="16" x2="17" y2="16" />
          </svg>
      </span>
      <select v-model="selectedAgent" class="sidebar-li">
        <option disabled value="">Choose an Agent</option>
        <option v-for="agent in agents" :key="agent.name" :value="agent.name">{{ agent.name }}</option>
      </select>
    </a>
    <a class="" style="display:none">
      <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M18 15a6 6 0 1 1 -10.853 -3.529c1.926-2.338 4.763-3.327 3.848-8.47 2.355 1.761 5.84 5.38 2.022 9.406-1.136 1.091-.244 2.767 1.221 2.593.882-.105 2.023-.966 3.23-2.3.532.68.532 1.717.532 2.3z" />
          </svg>
      </span>
      <select id="abilitySelect" class="sidebar-li" @change="loadSVG">
        <option disabled selected value="">Choose an ability</option>
        <option v-for="ability in abilities" :key="ability">{{ ability }}</option>
      </select>
    </a>
    <a class="">
      <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-switch-horizontal" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="16 3 20 7 16 11" />
            <line x1="10" y1="7" x2="20" y2="7" />
            <polyline points="8 13 4 17 8 21" />
            <line x1="4" y1="17" x2="13" y2="17" />
          </svg>
      </span>
      <select id="sideSelect" class="sidebar-li" @change="loadSide">
        <option disabled selected value="">Choose a side</option>
        <option value="attacker">Attacker</option>
        <option value="defender">Defender</option>
      </select>
    </a>
    <a class="">
      <span class="icon"></span>
      <button type="button" name="button" class="sidebar-li" @click="setPoints">Click!</button>
    </a>
  </div>
  <object id="map-img" class="map-img" :data="`/img/${mapName}_map.svg`" type="image/svg+xml"></object>
</template>

<script>
export default {
  data() {
    return {
      selectedAgent: '',
      selectedAbility: '',
      selectedSide: '',
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
              atkPoints: [[686,371],[555,1652]],
              defPoints: [[]]
            },
            {
              name: 'Recon Darts',
              atkPoints: [[510, 139],[731,652],[584,856],[748,935],[388,1394]], //Coordinates from Illustrator file * (2047.2/722.354) and rounded
              defPoints: [[1102,1545],[1445,547]] //Coordinates from Illustrator file * (2047.2/722.354) and rounded
            }
          ]
        },
        {
          map: 'bind',
          pointData: [
            {
              name: 'Shock Darts',
              atkPoints: [],
              defPoints: []
            },
            {
              name: 'Recon Darts',
              atkPoints: [],
              defPoints: []
            }
          ]
        },
        {
          map: 'haven',
          pointData: [
            {
              name: 'Shock Darts',
              atkPoints: [],
              defPoints: []
            },
            {
              name: 'Recon Darts',
              atkPoints: [],
              defPoints: []
            }
          ]
        },
        {
          map: 'split',
          pointData: [
            {
              name: 'Shock Darts',
              atkPoints: [],
              defPoints: []
            },
            {
              name: 'Recon Darts',
              atkPoints: [],
              defPoints: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    loadSVG(){
      this.selectedAbility = document.getElementById('abilitySelect').value;
      var agent = this.selectedAgent;
      var ability = this.selectedAbility;
      var svg_id = (agent + ability).split(' ')[0];
      var svg_object = document.getElementById('map-img');
      var svg_select = svg_object.contentDocument.getElementsByClassName('ability');
      for (var i = 0; i < svg_select.length; i++) {
        if (svg_select[i].id == svg_id) {
          svg_select[i].style.display = 'inline';
        } else {
          svg_select[i].style.display = 'none';
        }
      }
    },
    loadSide() {
      this.selectedSide = document.getElementById('sideSelect').value;
      var side = this.selectedSide;
      var svg_object = document.getElementById('map-img');
      var svg_select = svg_object.contentDocument.getElementsByClassName('side');
      for (var i = 0; i < svg_select.length; i++) {
        if(svg_select[i].classList[0] == this.selectedSide) {
          svg_select[i].style.display = 'inline';
        } else {
          svg_select[i].style.display = 'none';
        }
      }
    },
    setPoints() {
      var map = this.$route.path.split('/')[2];
      var agent = this.selectedAgent;
      var ability = this.selectedAbility;
      var atkPoints = this.points.find(curMap => curMap.map === map).pointData.find(curAbil => curAbil.name === ability).atkPoints; // Get attacker point array with x- and y-coordinates
      var defPoints = this.points.find(curMap => curMap.map === map).pointData.find(curAbil => curAbil.name === ability).defPoints; // Get defender point array with x- and y-coordinates

      var svg_id = (agent + ability).split(' ')[0];
      var svg_object = document.getElementById('map-img');
      var svg_select = svg_object.contentDocument.getElementById(svg_id);

      var point_offset = 30; //set offset of polygon points from center

      for (var i = 0; i < atkPoints.length; i++) {
        //define four points of rhombus:
        var rhombus1 = (atkPoints[i][0] - point_offset) + ',' + atkPoints[i][1];
        var rhombus2 = atkPoints[i][0] + ',' + (atkPoints[i][1] + point_offset);
        var rhombus3 = (atkPoints[i][0] + point_offset) + ',' + atkPoints[i][1];
        var rhombus4 = atkPoints[i][0] + ',' + (atkPoints[i][1] - point_offset);

        //create polygon shape: e.g. for a rhombus around (10,10): <polygon points="0,10 10,20 20,10, 10,0" style="stroke:purple;stroke-width:1">
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttributeNS(null,'points', rhombus1 + ' ' + rhombus2 + ' ' + rhombus3 + ' ' + rhombus4);
        polygon.setAttributeNS(null,'style','fill:rgba(255,255,255,0);stroke:#EC5964;stroke-width:8px');
        polygon.setAttributeNS(null,'onclick','alert("click!")');

        svg_select.children[0].appendChild(polygon);
      }
      for (var i = 0; i < defPoints.length; i++) {
        //define four points of rhombus:
        var rhombus1 = (defPoints[i][0] - point_offset) + ',' + defPoints[i][1];
        var rhombus2 = defPoints[i][0] + ',' + (defPoints[i][1] + point_offset);
        var rhombus3 = (defPoints[i][0] + point_offset) + ',' + defPoints[i][1];
        var rhombus4 = defPoints[i][0] + ',' + (defPoints[i][1] - point_offset);

        //create polygon shape: e.g. for a rhombus around (10,10): <polygon points="0,10 10,20 10,20, 10,0" style="stroke:purple;stroke-width:1">
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttributeNS(null,'points', rhombus1 + ' ' + rhombus2 + ' ' + rhombus3 + ' ' + rhombus4);
        polygon.setAttributeNS(null,'style','fill:rgba(255,255,255,0);stroke:#EC5964;stroke-width:8px;');

        svg_select.children[1].appendChild(polygon);
      }
    },
    activeSidebar() {
      if (!(document.getElementById('sidebar').classList.contains('active'))) {
        return document.getElementById('sidebar').classList.add('active');
      } else {
        return document.getElementById('sidebar').classList.remove('active');
      }
    }
  },
  computed: {
    mapName() {
      return this.$route.params.name;
    },
    abilities() {
      if (this.selectedAgent) {
        document.getElementById('abilitySelect').parentElement.style.display = 'flex';
        return this.agents.find((agent) => agent.name === this.selectedAgent).options;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  &-img {
    max-height: calc(100vh - 75px);
    max-width: 100vw;
  }
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

  a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
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
  }
}

</style>
