export interface Product {
    _id: string
    images?: string[]
    productName: string
    productSlug: string
    price: number
    createdAt: string
    updatedAt: string
    discountAmount?: number
    sku?: string
    brand?: string
    quantity?: number
  }