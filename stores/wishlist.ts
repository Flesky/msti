type Id = string | number

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref<Array<Id>>([])

  function toggleLike(id: Id) {
    wishlist.value.includes(id) ? wishlist.value = wishlist.value.filter(i => i !== id) : wishlist.value.push(id)
  }

  function isLiked(id: Id) {
    return wishlist.value.includes(id)
  }

  return { wishlist, toggleLike, isLiked }
}, { persist: true })
