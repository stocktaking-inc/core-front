'use client'

import { ThemeProviderProps } from 'next-themes'
import { ReactNode } from 'react'

import { QueryProvider } from './QueryClient'
import { NextThemeProvider } from './NextTheme'

export const Providers = ({
  children,
  ...themeProps
}: ThemeProviderProps & { children: ReactNode }) => {
  return (
    <QueryProvider>
      <NextThemeProvider {...themeProps}>{children}</NextThemeProvider>
    </QueryProvider>
  )
}
