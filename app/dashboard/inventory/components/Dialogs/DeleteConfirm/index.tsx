import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export const DeleteConfirmDialog = (props: IDeleteConfirmDialog) => {
  return (
    <AlertDialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Элемент инвентаря будет навсегда удален из системы.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClick}>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={props.onClick1}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
