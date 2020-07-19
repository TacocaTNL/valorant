<template>
  <div id="sidebar">
    <select v-model="selectedAgent">
      <option disabled value="">Choose an Agent</option>
      <option v-for="agent in agents" :key="agent.name" :value="agent.name">{{ agent.name }}</option>
    </select>
    <select id="abilitySelect" style="display:none" @change="loadSVG">
      <option disabled selected value="">Choose an ability</option>
      <option v-for="ability in abilities" :key="ability">{{ ability }}</option>
    </select>
    <select id="sideSelect" @change="loadSide">
      <option disabled selected value="">Choose a side</option>
      <option value="attacker">Attacker</option>
      <option value="defender">Defender</option>
    </select>
    <button type="button" name="button" @click="setPoints">Click!</button>
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
    }
  },
  computed: {
    mapName() {
      return this.$route.params.name;
    },
    abilities() {
      if (this.selectedAgent) {
        document.getElementById('abilitySelect').style.display = 'inline';
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
