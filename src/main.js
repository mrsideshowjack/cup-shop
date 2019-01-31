import Vue from 'vue'
import './styles/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './registerServiceWorker'
import * as VueGoogleMaps from "vue2-google-maps";
import * as VueCookie from "vue-cookie";

Vue.use(VueCookie);

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_API_KEY
  }
});


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
  },
  mounted() {
  },
}).$mount('#app')

