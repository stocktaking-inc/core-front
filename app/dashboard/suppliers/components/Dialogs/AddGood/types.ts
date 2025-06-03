import {IGood} from "@/app/dashboard/suppliers/types";

export interface IAddGoodDialog {
  supplierId: number
  onAddGood: (good: IGood) => void
}
