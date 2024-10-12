import { Account, User as AuthUser } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import User from '@/libApi/models/User'
import connect from '@/libApi/connect'
import { IAuthUser, ISession } from './interfaces/Auth'

const createUser = async (userData: AuthUser) => {
  const newUser = new User({
    email: userData.email,
    name: userData.name,
  })
  await newUser.save()
}

export const authOptions: any = {
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
    async signIn({ user, account }: { user: IAuthUser; account: Account }) {
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
    async session({ session, token }: { session: ISession; token: IAuthUser & { sub?: string } }) {
      if (token) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
}
