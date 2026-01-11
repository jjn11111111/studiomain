export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  interval: "month"
}

export const PRODUCTS: Product[] = [
  {
    id: "monthly-subscription",
    name: "Pineal Vision Training Subscription",
    description: "Full access to all 30 stereoscopic exercises across 3 modules",
    priceInCents: 1111, // $11.11/month
    interval: "month",
  },
]
