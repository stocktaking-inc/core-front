import { BASE_BACKEND_URL } from '@/utils/shared/api/routes'
import { ISupplier, IGood } from '../types'

const handleApiError = async (response: Response, defaultMessage: string) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || defaultMessage)
  }
}

export const suppliersApi = {
  getSuppliers: async (): Promise<ISupplier[]> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers`)
    await handleApiError(response, 'Ошибка при загрузке поставщиков')
    return response.json()
  },

  getSupplier: async (id: number): Promise<ISupplier> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers/${id}`)
    await handleApiError(response, 'Поставщик не найден')
    return response.json()
  },

  addSupplier: async (supplier: Partial<ISupplier>): Promise<ISupplier> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        status: supplier.status || 'Active',
      }),
    })
    await handleApiError(response, 'Ошибка при добавлении поставщика')
    return response.json()
  },

  updateSupplier: async (id: number, supplier: Partial<ISupplier>): Promise<void> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        status: supplier.status,
      }),
    })
    await handleApiError(response, 'Ошибка при обновлении поставщика')
  },

  deleteSupplier: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers/${id}`, {
      method: 'DELETE',
    })
    await handleApiError(response, 'Ошибка при удалении поставщика')
  },

  addGood: async (supplierId: number, good: Partial<IGood>): Promise<IGood> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers/${supplierId}/goods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: good.name,
        article: good.article,
        purchasePrice: good.purchasePrice,
        category: good.category,
        supplierId,
      }),
    })
    await handleApiError(response, 'Ошибка при добавлении товара')
    return response.json()
  },

  getGood: async (id: number): Promise<IGood> => {
    const response = await fetch(`${BASE_BACKEND_URL}/suppliers/goods/${id}`)
    await handleApiError(response, 'Товар не найден')
    return response.json()
  },
}
