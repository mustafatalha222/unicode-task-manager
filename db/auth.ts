import { Account, User as AuthUser } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import User from '@/db/models/User'
import connect from '@/db/connect'

const createUser = async (userData: AuthUser) => {
  const newUser = new User({
    email: userData.email,
    name: userData.name,
  })
  await newUser.save()
}

export const authOptions: any = {
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        await connect()
        try {
          const user = await User.findOne({ email: credentials.email })
          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return user
          }
        } catch (err) {
          console.error('Authorization error:', err)
          throw new Error('Invalid credentials')
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === 'credentials') {
        return true
      }

      await connect()
      try {
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          await createUser(user)
        }
        return true
      } catch (err) {
        console.error('Sign in error:', err)
        return false
      }
    },
  },
}
