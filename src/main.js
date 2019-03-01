import Vue from 'vue'
import './styles/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './registerServiceWorker'
import * as VueCookie from "vue-cookie";
import { L } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

Vue.use(VueCookie);

Vue.config.productionTip = false

Vue.use(ElementUI)



// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
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

