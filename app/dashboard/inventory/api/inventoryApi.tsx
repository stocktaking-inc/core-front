import { toast } from 'sonner'

import { BASE_BACKEND_URL } from '@/utils/shared/api/routes'

export const fetchItems = async (signal: AbortSignal): Promise<InventoryItem[]> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/items`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    if (!(err instanceof DOMException && err.name === 'AbortError')) {
      const message = err instanceof Error ? err.message : 'Не удалось загрузить данные'
      toast.warning('Ошибка', { description: message })
      throw err
    }
    return []
  }
}

export const addItem = async (newItem: Omit<InventoryItem, 'id' | 'status'>): Promise<InventoryItem> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newItem),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось добавить элемент'
    toast.warning('Ошибка', { description: message })
    throw err
  }
}

export const deleteItem = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/items/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось удалить элемент'
    toast.warning('Ошибка', { description: message })
    throw err
  }
}

export const editItem = async (updatedItem: InventoryItem): Promise<InventoryItem> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/items/${updatedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: updatedItem.name,
        article: updatedItem.article,
        category: updatedItem.category,
        quantity: updatedItem.quantity,
        locationId: updatedItem.locationId,
        supplierId: updatedItem.supplierId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
    }

    const contentLength = response.headers.get('Content-Length')
    const hasBody = contentLength !== '0' && contentLength !== null
    return hasBody ? await response.json() : updatedItem
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось обновить элемент'
    toast.warning('Ошибка', { description: message })
    throw err
  }
}
