// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '@/store/StoreProvider'
import React, { ReactNode } from 'react'
import enMessages from '@/locales/en.json'

interface TestProvidersProps {
  children: ReactNode
  messages?: Record<string, string>
  session?: any
  locale?: string
}

// Mocking the translations to avoid MISSING_MESSAGE warnings
const MockNextIntlClientProvider: React.FC<TestProvidersProps> = ({ children, messages = {}, locale = 'en' }) => {
  const defaultMessages = enMessages

  const mergedMessages = { ...defaultMessages, ...messages }

  return (
    <NextIntlClientProvider messages={mergedMessages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}

// TestProviders component to wrap necessary context providers
const TestProviders: React.FC<TestProvidersProps> = ({ children, messages = {}, session = null, locale = 'en' }) => {
  return (
    <SessionProvider session={session}>
      <MockNextIntlClientProvider messages={messages} locale={locale}>
        <Toaster position="top-center" />
        <StoreProvider>
          <div>{children}</div>
        </StoreProvider>
      </MockNextIntlClientProvider>
    </SessionProvider>
  )
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    messages,
    session,
    locale = 'en',
    ...options
  }: { messages?: Record<string, string>; session?: any; locale?: string } & RenderOptions = {}
) => {
  return render(
    <TestProviders messages={messages} session={session} locale={locale}>
      {ui}
    </TestProviders>,
    options
  )
}

export * from '@testing-library/react'
export { renderWithProviders }
