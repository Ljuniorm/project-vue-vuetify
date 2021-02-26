<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <v-card
      elevation="0"
      class="mr-12"
      height="64px"
      width="350px"
      color="#FFFFFF2A"
    >
      <v-row no-gutters class="mt-2 ml-6">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-col class="mt-n4">
          <v-card-title><b>Jones Doe</b> </v-card-title>
          <v-card-subtitle class="mt-n6"
            ><span>Último Login {{ getDate() }}</span>
          </v-card-subtitle>
        </v-col>
        <v-icon class="mt-n3 mr-6">mdi-menu-down</v-icon>
      </v-row>
    </v-card>
  </v-app-bar>
</template>

<script>
export default {
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      const date = new Date(),
        day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate(),
        month =
          date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>


<style scoped>
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

