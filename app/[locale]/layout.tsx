import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import ProviderSession from '@/providers/ProviderSession'
import { Toaster } from 'react-hot-toast'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task Manager is an amazing tool for managing task',
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()
  const session = await getServerSession()

  return (
    <html lang={locale}>
      <body className={`${poppins.className}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <ProviderSession session={session}>
          <NextIntlClientProvider messages={messages}>
            <Toaster position="top-center" />
            <StoreProvider>{children}</StoreProvider>
          </NextIntlClientProvider>
        </ProviderSession>
      </body>
    </html>
  )
}
