<template>
  <header>
    <router-link to="/">
      <div id="brand">Valorant</div>
    </router-link>
    <div id="nav"></div>
    <div id="login">
      <button type="button" @click="modalActive = true">Login</button>
    </div>
  </header>
  <main>
    <Modal :active="modalActive" @close="modalActive = false" />
    <router-view />
  </main>
  <footer v-if="this.$route.path == '/'"></footer>
</template>

<script>
import Modal from './components/modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modalActive: false,
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  grid-area: header;
  align-items: center;
  background-color: #000000;
}

#brand {
  flex: 0 0 auto;
  margin: 0 20px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #ffffff;
}

#nav {
  flex: 1 1 auto;
}

#login {
  flex: 0 0 auto;
  margin: 0 20px;

  button {
    border: 0;
    border-radius: 3px;
    padding: 12px 30px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    background-color: #ff4655;
    color: white;
  }
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: main;
}

footer {
  grid-area: footer;
  color: #FFFFFF;
  background-color: #000000;
}

</style>
