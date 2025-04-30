import * as z from 'zod'

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(19, { message: 'Номер карты должен содержать 16 цифр' })
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, { message: 'Неверный формат номера карты' }),
  cardName: z
    .string()
    .min(2, { message: 'Имя владельца должно содержать минимум 2 символа' })
    .regex(/^[A-Z\s]+$/, { message: 'Имя должно содержать только латинские буквы' })
    .refine(value => value.trim().split(/\s+/).length >= 2, {
      message: 'Имя владельца должно содержать минимум два слова'
    }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, { message: 'Неверный формат даты' }),
  cvv: z
    .string()
    .length(3, { message: 'CVV должен содержать 3 цифры' })
    .regex(/^\d{3}$/, { message: 'CVV должен содержать только цифры' })
})
