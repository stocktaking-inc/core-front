import { toast } from 'sonner'
import { BASE_BACKEND_URL } from '@/utils/shared/api/routes'

export const fetchWarehouses = async (signal: AbortSignal): Promise<IWarehouse[]> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/warehouses`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    if (!(err instanceof DOMException && err.name === 'AbortError')) {
      const message = err instanceof Error ? err.message : 'Не удалось загрузить склады'
      toast.error('Ошибка', { description: message })
      throw err
    }
    return []
  }
}

export const addWarehouse = async (newWarehouse: Omit<IWarehouse, 'id'>): Promise<IWarehouse> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/warehouses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newWarehouse)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось добавить склад'
    toast.error('Ошибка', { description: message })
    throw err
  }
}

export const editWarehouse = async (updatedWarehouse: IWarehouse): Promise<IWarehouse> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/warehouses/${updatedWarehouse.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: updatedWarehouse.name,
        address: updatedWarehouse.address,
        isActive: updatedWarehouse.isActive
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error: ${response.status}`)
    }

    const contentLength = response.headers.get('Content-Length')
    const hasBody = contentLength !== '0' && contentLength !== null
    return hasBody ? await response.json() : updatedWarehouse
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось обновить склад'
    toast.error('Ошибка', { description: message })
    throw err
  }
}

export const patchWarehouse = async (id: number, isActive: boolean): Promise<void> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/warehouses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ isActive })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error: ${response.status}`)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Не удалось обновить статус склада'
    toast.error('Ошибка', { description: message })
    throw err
  }
}

export const deleteWarehouse = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/warehouses/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `HTTP error: ${response.status}`)
    }
  } catch (err) {
    throw err
  }
}
