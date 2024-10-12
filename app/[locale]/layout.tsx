import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import ProviderSession from '@/providers/ProviderSession'
import { Toaster } from 'react-hot-toast'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task Manager is an amazing tool for task management',
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
      {/* dir={locale === 'ar' ? 'rtl' : 'ltr'} */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
