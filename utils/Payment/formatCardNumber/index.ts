export const formatCardNumber = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, '')
  const parts = []
  for (let i = 0, len = digitsOnly.length; i < len; i += 4) {
    parts.push(digitsOnly.substring(i, i + 4))
  }
  return parts.join(' ')
}
