'use client'

import MainLayout from './MainLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
