<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style >
* {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  font-family: Roboto, sans-serif;
  margin: 0;
}

.v-avatar {
  border: 1px solid white;
}

b {
  font-size: 0.8em;
}

span {
  font-size: 0.9em;
}
</style>
