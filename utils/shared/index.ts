export const getInitials = (name?: string) => {
  if (!name) return '!!'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
