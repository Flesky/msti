import { ofetch } from 'ofetch'

const { strapiURL, strapiSecret, regionId } = useRuntimeConfig()
export const api = ofetch.create({
  baseURL: `${strapiURL}/api`,
  params: {
    region: regionId,
  },
  headers: {
    Authorization: `Bearer ${strapiSecret}`,
  },
})
