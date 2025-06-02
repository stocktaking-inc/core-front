export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    case 'Processing':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    case 'Shipped':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
    case 'Delivered':
      return 'bg-green-100 text-green-800 hover:bg-green-100'
    case 'Cancelled':
      return 'bg-red-100 text-red-800 hover:bg-red-100'
    default:
      return ''
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'Ожидает'
    case 'Processing':
      return 'Обрабатывается'
    case 'Shipped':
      return 'Отправлен'
    case 'Delivered':
      return 'Доставлен'
    case 'Cancelled':
      return 'Отменен'
    default:
      return status
  }
}
