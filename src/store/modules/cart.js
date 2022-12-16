import shop from "../../api/shop"

export default {
  namespaced: true,

  state: { // = data
    items: [],
    checkoutStatus: null
  },

  getters: {// = computed properties

    cartProducts (state, getters, rootState, rootGetters) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id)
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
        state.items,
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
    },

    addProductToCart ({commit, getters, state, rootState, rootGetters}, product){
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        }else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('products/decrementProductInventory', product, {root: true})
      }
    }
  },
// it can be very tempting to set states in action, but you shoudn't it goes agains the idea of centralized store
// what we should do instead is to cal the mutation inside the action
  mutations: {// = responsible for setting and updating the state 
    pushProductToCart (state, productId) {
      console.log('different item')
      state.items.push({
        id: productId,
        quantity: 1
      })

    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
      console.log('same item')
    },

    emptyCart (state) {
      state.items = []
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }, 
  }

}