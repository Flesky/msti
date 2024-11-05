import type { Product } from '~/server/api/products'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Array<{ product: Product, quantity: number }>>([])

  function addToCart(product: Product, quantity = 1) {
    const existingProduct = cart.value.find(p => p.product.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += quantity
    }
    else {
      cart.value.push({ product, quantity })
    }
  }

  function updateQuantity(id: string, quantity: number) {
    const product = cart.value.find(p => p.product.id === id)
    if (product) {
      product.quantity = quantity
    }
  }

  function removeFromCart(id: string) {
    const index = cart.value.findIndex(p => p.product.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  return { cart, addToCart, updateQuantity, removeFromCart }
})
