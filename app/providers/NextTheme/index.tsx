'use client'

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'
import { ReactNode } from 'react'

export const NextThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps & { children: ReactNode }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
