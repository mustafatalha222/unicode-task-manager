import 'next-auth'

declare module 'next-auth' {
  interface Profile {
    id: string // Add any other custom properties you may have
  }

  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string | null
    }
    expires: ISODateString
  }
}
