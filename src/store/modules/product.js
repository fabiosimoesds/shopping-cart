export default {
  state: { // = data
    products: []
  },

  getters: {// = computed properties
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: {
    fetchProducts ({commit}) {

      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  },
// it can be very tempting to set states in action, but you shoudn't it goes agains the idea of centralized store
// what we should do instead is to cal the mutation inside the action
  mutations: {// = responsible for setting and updating the state 
    setProducts (state, products) {

      state.products = products

    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }

}