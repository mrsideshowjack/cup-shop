import Vue from 'vue'
import './styles/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './registerServiceWorker'
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
    // var websdkScript = document.createElement('script');
    // websdkScript.setAttribute('src', 'https://websdk.consentua.com/websdk/consentua-embed.js.php');
    // document.body.appendChild(websdkScript);
  },
  mounted() {
  },
}).$mount('#app')

