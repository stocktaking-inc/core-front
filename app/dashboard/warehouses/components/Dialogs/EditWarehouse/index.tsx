'use client';

import React, { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const EditWarehouseDialog = ({ item, onSaveAction }: IEditWarehouseDialog) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WarehouseItem>({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSaveAction(formData);
      setOpen(false);
      toast.success('Склад обновлён');
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Редактировать склад</DialogTitle>
            <DialogDescription>Обновите данные склада.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                name="name"
                placeholder="Центральный склад"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                name="address"
                placeholder="ул. Примерная, 123"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value || null })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Активен</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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
