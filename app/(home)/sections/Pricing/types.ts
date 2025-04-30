interface IPricingCard {
  title: string
  description: string
  price: string
  features: string[]
  highlighted?: boolean
  onSelectAction: (plan: string) => void
}
