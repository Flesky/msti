import equipmentData from '~/mock/equipmentData.json'

export interface Product {
  url: string
  id: string
  data: {
    product_name: string
    part_number: string
    images: Array<string>
    oem_reference: {
      [key: string]: string | number
    }
    compatibility: {
      manufacturer: string
      [key: string]: string | number
    }
    technical_specifications: {
      category: string
      [key: string]: string | number
    }
  }
}

const PRODUCTS = equipmentData.map((product: Product) =>
  ({ ...product, id: product.url.split('/').pop() })) as Product[]

export default PRODUCTS
