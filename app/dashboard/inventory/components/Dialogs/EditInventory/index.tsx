'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

import { IEditInventoryDialog } from './types';

interface Warehouse {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
}

import {ISupplier} from "@/app/dashboard/suppliers/components/types";

export const EditInventoryDialog = ({
                                                                      item,
                                                                      open,
                                                                      onOpenChangeAction,
                                                                      onSaveAction,
                                                                    }: IEditInventoryDialog) => {
  const [isLoading, setIsLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'status'>>({
    name: item?.name || '',
    article: item?.article || '',
    category: item?.category || '',
    quantity: item?.quantity || 0,
    locationId: item?.locationId || null,
    supplierId: item?.supplierId || 0,
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch('http://localhost:5101/api/warehouses', {
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) throw new Error('Ошибка загрузки складов');
        const data: Warehouse[] = await response.json();
        setWarehouses(data.filter((w) => w.isActive));
      } catch (err) {
        toast.warning('Ошибка', {
          description: 'Не удалось загрузить склады',
        });
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:5101/api/suppliers', {
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) throw new Error('Ошибка загрузки поставщиков');
        const data: ISupplier[] = await response.json();
        setSuppliers(data);
      } catch (err) {
        toast.warning('Ошибка', {
          description: 'Не удалось загрузить поставщиков',
        });
      }
    };

    if (open) {
      fetchWarehouses();
      fetchSuppliers();
    }
  }, [open]);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        article: item.article,
        category: item.category,
        quantity: item.quantity,
        locationId: item.locationId,
        supplierId: item.supplierId,
      });
    }
  }, [item]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      if (formData.quantity < 0) {
        toast.warning('Ошибка', {
          description: 'Количество не может быть отрицательным',
        });
        setIsLoading(false);
        return;
      }

      if (!item) {
        setIsLoading(false);
        return;
      }

      const updatedItem: InventoryItem = {
        id: item.id,
        status: item.status, // Сохраняем текущий статус, сервер обновит
        ...formData,
      };

      try {
        await onSaveAction(updatedItem);
        toast.info('Элемент обновлен', {
          description: `Элемент ${updatedItem.name} успешно обновлен.`,
        });
        onOpenChangeAction(false);
      } catch (err) {
        toast.warning('Ошибка',{
          description: err instanceof Error ? err.message : 'Не удалось обновить элемент',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [item, formData, onSaveAction, onOpenChangeAction]
  );

  const handleCancel = useCallback(() => {
    onOpenChangeAction(false);
  }, [onOpenChangeAction]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>Обновите данные элемента инвентаря.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article">Артикул</Label>
              <Input
                id="article"
                name="article"
                value={formData.article}
                onChange={(e) => setFormData({ ...formData, article: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Количество</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationId">Местоположение</Label>
              <Select
                name="locationId"
                value={formData.locationId?.toString() || ''}
                onValueChange={(value) =>
                  setFormData({ ...formData, locationId: value ? parseInt(value) : null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите склад" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Нет склада</SelectItem>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplierId">Поставщик</Label>
              <Select
                name="supplierId"
                value={formData.supplierId.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, supplierId: parseInt(value) })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите поставщика" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
