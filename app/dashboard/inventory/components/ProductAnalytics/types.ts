interface IProductAnalytics {
  productId: string
  productName: string
  currentStock: number
  medianDemand: number
  daysUntilDepletion: number
  usageLevel: 'high' | 'medium' | 'low'
}
