import type { Product } from '~/mock/products'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Array<{ product: Product, quantity: number }>>([])
  const toast = useToast()

  function addToCart(product: Product, quantity = 1) {
    const existing = cart.value.find(p => p.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    }
    else {
      cart.value.push({ product, quantity })
    }
    toast.add({ severity: 'success', summary: `Added ${product.data.product_name} to cart`, life: 3000 })
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
      toast.add({ severity: 'success', summary: `Removed ${cart.value.splice(index, 1)[0].product.data.product_name} from cart`, life: 3000 })
    }
  }

  return { cart, addToCart, updateQuantity, removeFromCart }
}, { persist: true })
