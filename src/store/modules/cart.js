export default {
  state: { // = data
    cart: [],
    checkoutStatus: null
  },

  getters: {// = computed properties

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
      }
  },

  actions: {
    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    },
  
    showStatus(context) {
      context.commit('getStatus')
    }
  },
// it can be very tempting to set states in action, but you shoudn't it goes agains the idea of centralized store
// what we should do instead is to cal the mutation inside the action
  mutations: {// = responsible for setting and updating the state 
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

    emptyCart (state) {
      state.cart = []
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }, 
  }

}