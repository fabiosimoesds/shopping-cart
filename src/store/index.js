import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [],
    checkoutStatus: null
  },

  getters: {// = computed properties
      availableProducts (state, getters) {
        return state.products.filter(product => product.inventory > 0)
      },

      cartProducts (state) {
        return state.cart.map(cartItem => {
          const product = state.products.find(product => product.id === cartItem.id)
          return {
            title: product.title,
            price: product.price,
            quantity: cartItem.quantity
          }
        })
      },

      cartTotal (state, getters) {
        return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
      },

      productIsInStock() {
        return (product) => {
          return product.inventory > 0
        }
      }
  },

  actions,
// it can be very tempting to set states in action, but you shoudn't it goes agains the idea of centralized store
// what we should do instead is to cal the mutation inside the action
  mutations: {// = responsible for setting and updating the state 
    setProducts (state, products) {

      state.products = products

    },

    pushProductToCart (state, productId) {
      console.log('different item')
      state.cart.push({
        id: productId,
        quantity: 1
      })

    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
      console.log('same item')
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

    emptyCart (state) {
      state.cart = []
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }, 
  }

})