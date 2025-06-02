interface IDeleteConfirmDialog {
  open: boolean
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void
  onClick: () => void
  onClick1: () => void
}
