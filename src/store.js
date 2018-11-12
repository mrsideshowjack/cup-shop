import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cart: [],
    consentuaUID: false,
    consentuaConsents: []
  },
  mutations: {
    cartAdd (state, payload) {
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
    cartRemove (state, payload) {
      state.cart.find(x => x.id === payload.id).quantity -= payload.amount
    },
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('cupCart')) {
        // Replace the state object with the stored item
        state.cart = JSON.parse(localStorage.getItem('cupCart'))
      }
      if(localStorage.getItem('consentuaUID')) {
        // Replace the state object with the stored item
        state.consentuaUID = localStorage.getItem('consentuaUID')
			}
    },
    clearCartStorage(state){
      state.cart = [];
      localStorage.removeItem("cupCart");
    },
    updateConsentuaUID (state, payload){
      state.consentuaUID = payload.value
      localStorage.setItem('consentuaUID', payload.value);
    },
    clearConsentuaUID(state){
      state.consentuaUID = false;
      localStorage.removeItem("consentuaUID");
    },
    updateConsentuaConsents (state, payload){
      var x = {
        id: Object.keys(payload.value)[0],
        consent: payload.value[Object.keys(payload.value)[0]]
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
  },
  getters: {
    cartTotal: state => {
      let x = 0
      for (let i = 0; i < state.cart.length; i++) {
        x = x + state.cart[i].quantity
        
      }
      // state.cart.forEach(i => {
      //   x = x + i.quantity
      // });
      return x
    }
  }
})