import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    consentuaUid: ''
  },
  mutations: {
    cartAdd (state, payload) {
      console.log(state.cart);
      
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
				// this.replaceState(
				// 	Object.assign(state.cart, JSON.parse(localStorage.getItem('cupCart')))
				// );
			}
    },
    clearCartStorage(state){
      state.cart = [];
      localStorage.removeItem("cupCart");
    }
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