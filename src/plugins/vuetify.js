import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#FF1744',
            secondary: '#4A148C',
            primaryOpacity: '#FFFFFF2A',
          },
        },
      },
});
