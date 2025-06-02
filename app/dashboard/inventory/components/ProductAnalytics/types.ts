interface IProductAnalytics {
  productId: number
  productName: string
  currentStock: number
  medianDemand: number
  daysUntilDepletion: number
  usageLevel: 'high' | 'medium' | 'low'
}
