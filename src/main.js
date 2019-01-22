import Vue from 'vue'
import './styles/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";
import { store } from './store'
import './registerServiceWorker'
import * as VueCookie from "vue-cookie";

Vue.use(VueCookie);

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCWudya1uU_v58HAFtGLM1A1898oCzbQoI"
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

