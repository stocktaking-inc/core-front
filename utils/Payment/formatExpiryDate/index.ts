export const formatExpiryDate = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, '')
  if (digitsOnly.length >= 2) {
    return digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4)
  }
  return digitsOnly
}
