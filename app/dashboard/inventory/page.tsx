'use client';

import { useState, useEffect } from 'react';
import { InventoryTable } from './components/InventoryTable';
import { AddInventoryDialog } from './components/Dialogs/AddInventory';
import { DashboardPageWrapper } from '../components/DashboardPageWrapper';

import { toast } from 'sonner';

const API_URL = 'http://localhost:5101';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/items`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: InventoryItem[] = await response.json();
        setItems(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          const message = err instanceof Error ? err.message : 'Не удалось загрузить данные';
          setError(message);
          toast.warning('Ошибка', {
            description: message
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    return () => controller.abort();
  }, []);

  const handleAddItem = async (newItem: Omit<InventoryItem, 'id' | 'status'>) => {
    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const addedItem: InventoryItem = await response.json();
      setItems([...items, addedItem]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось добавить элемент';
      toast.warning('Ошибка',{
        description: message,
      });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось удалить элемент';
      toast.warning('Ошибка', {
        description: message,
      });
    }
  };

  const handleEditItem = async (updatedItem: InventoryItem) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: updatedItem.name,
          article: updatedItem.article,
          category: updatedItem.category,
          quantity: updatedItem.quantity,
          locationId: updatedItem.locationId,
          supplierId: updatedItem.supplierId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      // Если сервер возвращает обновлённый элемент, используем его
      const contentLength = response.headers.get('Content-Length');
      const hasBody = contentLength !== '0' && contentLength !== null;
      let finalItem = updatedItem;
      if (hasBody) {
        const responseData: InventoryItem = await response.json();
        finalItem = responseData;
      }

      setItems(items.map((item) => (item.id === updatedItem.id ? finalItem : item)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось обновить элемент';
      toast.warning('Ошибка', {
        description: message,
      });
    }
  };


  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <DashboardPageWrapper
      heading="Инвентарь"
      text="Управление элементами инвентаря."
      action={<AddInventoryDialog onAddItemAction={handleAddItem} />}
    >
      <InventoryTable
        items={items}
        onDeleteItemAction={handleDeleteItem}
        onEditItemAction={handleEditItem}
      />
    </DashboardPageWrapper>
  );
}
