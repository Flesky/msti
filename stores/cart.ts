import type { Product } from '~/mock/products'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Array<{ product: Product, quantity: number }>>([])
  const toast = useToast()

  // TODO: Add checkout button
  function addToCart(product: Product, quantity = 1) {
    const existing = cart.value.find(p => p.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    }
    else {
      cart.value.push({ product, quantity })
    }
    toast.add({ severity: 'success', summary: `Added ${quantity}x ${product.data.product_name} to cart`, life: 3000 })
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

  function checkout() {
    const items = cart.value.map(entry => `${entry.quantity}x ${entry.product.data.product_name} (PN: ${entry.product.data.part_number})`).join('\n')
    cart.value = []
    console.log(items)
    return items
  }

  return { cart, addToCart, updateQuantity, removeFromCart, checkout }
}, { persist: true })
