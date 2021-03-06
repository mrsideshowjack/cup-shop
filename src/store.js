import Vue from 'vue'
import Vuex from 'vuex'
import DemoDb from './assets/db'
import axios from 'axios';
import * as VueCookie from "vue-cookie";

Vue.use(VueCookie);

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    cart: [],
    consentuaConsents: [],
    db: DemoDb,
    sidebarOpen: true,
    cookiePopOpen: false,
    consentuaUID: false,
    cid: process.env.VUE_APP_CONSENTUA_CID,
    sid: process.env.VUE_APP_CONSENTUA_SID,
    skey: process.env.VUE_APP_CONSENTUA_SKEY
  },
  mutations: {
    cartAdd(state, payload) {
      let x = state.cart.find(x => x.id === payload.id)
      if (x) {
        x.quantity += payload.amount
      } else {
        state.cart.push({
          id: payload.id,
          quantity: payload.amount
        })
      }
      localStorage.setItem('cupCart', JSON.stringify(state.cart));
    },
    cartRemove(state, payload) {
      let y = state.cart.find(x => x.id === payload.id)
      if (payload.amount == 'all') {
        state.cart.splice(state.cart.indexOf(y), 1)
      } else if (y.quantity == 1) {
        state.cart.splice(state.cart.indexOf(y), 1)
      } else {
        y.quantity -= payload.amount
      }
      localStorage.setItem('cupCart', JSON.stringify(state.cart));
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('cupCart')) {
        // Replace the state object with the stored item
        state.cart = JSON.parse(localStorage.getItem('cupCart'))
      }
      if (localStorage.getItem('consentuaUID')) {
        // Replace the state object with the stored item
        state.consentuaUID = localStorage.getItem('consentuaUID')
      }
      // load consents
      axios
        .get('https://api.consentua.com/serviceuser/AnonGetServiceUser', {
          params: {
            serviceId: state.sid,
            identifier: state.consentuaUID
          }
        })
        .then(response => {
          axios
            .post('https://api.consentua.com/userconsent/AnonGetConsents', {
              ClientId: state.cid,
              ServiceId: state.sid,
              UserId: response.data.UserId
            })
            .then(response => {
              if (response.data.Consent == null && response.data.Success) {
                // no consents for user yet
                console.warn(response)
              } else if (response.data.Consent.Purposes.length > 0) {
                // has consents, create obj and set state
                var x = []
                for (let i = 0; i < response.data.Consent.Purposes.length; i++) {
                  console.log(response.data.Consent.Purposes[i]);
                  
                  x.push({
                    id: response.data.Consent.Purposes[i].PurposeId.toString(),
                    template: response.data.Consent.Purposes[i].ConsentTemplateId.toString(),
                    consent: response.data.Consent.Purposes[i].Consent
                  })
                }
                // set state consents
                state.consentuaConsents = x
              } else {
                console.warn(response)
              }
            })
            .catch(error => console.warn(error))
        })
        .catch(error => console.warn(error))

        // setTimeout(function(){ state.sidebarOpen == true; }, 3000);
    },
    clearCartStorage(state) {
      state.cart = [];
      localStorage.removeItem("cupCart");
    },
    updateConsentuaUID(state, payload) {
      state.consentuaUID = payload.value
      localStorage.setItem('consentuaUID', payload.value);
    },
    clearConsentuaUID(state) {
      state.consentuaUID = false;
      localStorage.removeItem("consentuaUID");
    },
    updateConsentuaConsents(state, payload) {
      var x = {
        id: Object.keys(payload.value)[0],
        consent: payload.value[Object.keys(payload.value)[0]]
      }

      // check if need to remove cookie
      if (x.id == '236' && !x.consent) {
        document.cookie = "consented_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      if (state.consentuaConsents.length == 0) {
        state.consentuaConsents.push(x)
      } else {
        let t = state.consentuaConsents.find(y => y.id === x.id)
        if (t) {
          t.consent = x.consent
        } else {
          state.consentuaConsents.push(x)
        }
      }
    },
    _toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    _toggleCookiePopOpen(state, payload) {
      state.cookiePopOpen = payload.value      
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('_toggleSidebar')
    },
    toggleCookiePopOpen ({ commit }) {
      commit('_toggleCookiePopOpen')
    }
  },
  getters: {
    cartTotal: state => {
      let x = 0
      for (let i = 0; i < state.cart.length; i++) {
        x = x + state.cart[i].quantity
      }
      return x
    },
    dbSingle: (state) => (id) => {
      return state.db.find(db => db.id === id)
    },
    dbGetSelected: (state) => (body) => {
      var result = {
        data: [],
        amount: 0
      }
      for (let i = 0; i < body.length; i++) {
        var data = state.db.filter(obj => {
          return obj.id === body[i].id
        })
        let x = body[i].quantity * data[0].price
        result.data.push(data[0])
        result.amount = result.amount + x
      }
      return result;
    },
    sidebarOpen: state => state.sidebarOpen,
    cookiePopOpen: state => state.cookiePopOpen
  }
})