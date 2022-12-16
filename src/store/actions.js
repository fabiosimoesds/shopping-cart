import shop from "../api/shop"

export default {// = Methods and actions
  fetchProducts ({commit}) {

    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        commit('setProducts', products)
        resolve()
      })
    })
  },

  addProductToCart ({commit, getters, state}, product){
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', product.id)
      }else {
        commit('incrementItemQuantity', cartItem)
      }
      commit('decrementProductInventory', product)
    }
  },

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
}