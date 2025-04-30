import type { DateRange } from 'react-day-picker'

export interface IDateRangeDialog {
  onDateChange?: (date: DateRange | undefined) => void
}
