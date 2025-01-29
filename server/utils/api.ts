import { ofetch } from 'ofetch'

const { strapiURL, strapiSecret } = useRuntimeConfig()
export const api = ofetch.create({
  baseURL: `${strapiURL}/api`,
  headers: {
    Authorization: `Bearer ${strapiSecret}`,
  },
})
