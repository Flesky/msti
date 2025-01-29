import { api } from '~/server/utils/api'

export interface Root {
  data: Array<{
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    banners: Array<{
      id: number
      title: string
      subtitle: string
      backgroundImage: {
        id: number
        documentId: string
        name: string
        alternativeText: any
        caption: any
        width: number
        height: number
        formats: {
          thumbnail: {
            name: string
            hash: string
            ext: string
            mime: string
            path: any
            width: number
            height: number
            size: number
            sizeInBytes: number
            url: string
          }
          small: {
            name: string
            hash: string
            ext: string
            mime: string
            path: any
            width: number
            height: number
            size: number
            sizeInBytes: number
            url: string
          }
          large: {
            name: string
            hash: string
            ext: string
            mime: string
            path: any
            width: number
            height: number
            size: number
            sizeInBytes: number
            url: string
          }
          medium: {
            name: string
            hash: string
            ext: string
            mime: string
            path: any
            width: number
            height: number
            size: number
            sizeInBytes: number
            url: string
          }
        }
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: any
        provider: string
        provider_metadata: any
        createdAt: string
        updatedAt: string
        publishedAt: string
      }
    }>
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export default defineEventHandler(async () => {
  const { strapiURL, regionId } = useRuntimeConfig()
  const { data } = await api<Root>(`/homepages?filters[id][$eq]=${regionId}&populate[0]=banners&populate[1]=banners.backgroundImage`)
  return data[0].banners.map(({ title, subtitle, backgroundImage }) => ({
    title,
    subtitle,
    backgroundImage: `${strapiURL}${backgroundImage.url}`,
  }))
})
