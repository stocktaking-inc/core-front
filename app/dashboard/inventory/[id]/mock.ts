export const item = {
  id: 1,
  name: 'Wireless Headphones',
  article: 'WH-1001',
  category: 'Electronics',
  quantity: 23,
  locationId: 'Warehouse A',
  status: 'In Stock',
  medianDemand: 2.5,
  daysUntilDepletion: 9,
  usageLevel: 'high' as const,
  supplier: {
    name: 'TechSupply Inc.',
    contact: 'john@techsupply.com'
  },
  movementHistory: [
    { date: '2023-05-01', type: 'Received', quantity: 50, balance: 50 },
    { date: '2023-05-05', type: 'Sold', quantity: -10, balance: 40 },
    { date: '2023-05-10', type: 'Sold', quantity: -8, balance: 32 },
    { date: '2023-05-15', type: 'Sold', quantity: -5, balance: 27 },
    { date: '2023-05-20', type: 'Sold', quantity: -4, balance: 23 }
  ]
}
