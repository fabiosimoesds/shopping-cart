import Vuex from 'vuex'
import Vue from 'vue'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  state: { // = data
    
  },

  getters: {// = computed properties
      
  },

  actions: {

  },
// it can be very tempting to set states in action, but you shoudn't it goes agains the idea of centralized store
// what we should do instead is to cal the mutation inside the action
  mutations: {// = responsible for setting and updating the state 
    
  }

})