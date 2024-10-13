import { User as AuthUser, NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '@/libApi/models/User'
import connect from '@/libApi/connect'
import mongoose from 'mongoose'

const createUser = async (userData: AuthUser, provider: string, providerId: string) => {
  await new User({
    email: userData.email,
    name: userData.name,
    image: userData.image,
    provider,
    providerId,
  }).save()
}

export const auth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connect()
        try {
          const user = await User.findOne({ email: credentials?.email })
          if (user && (await bcrypt.compare(credentials!.password, user.password))) {
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
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID ?? '',
    //   clientSecret: process.env.GOOGLE_SECRET ?? '',
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'credentials' || !profile || !account) {
        return true
      }
      await connect()

      try {
        // Check if a user exists with the providerId (sub) from the OAuth provider
        const existingUser = await User.findOne({
          providerId: profile.id,
          provider: account.provider,
        })

        if (!existingUser) {
          const emailUser = await User.findOne({ email: user.email })
          if (!emailUser) {
            // If no user found by email, create a new user with providerId
            await createUser(user, account.provider, profile.id)
          } else {
            // If user found by email but not providerId, update user with providerId
            emailUser.providerId = profile.id
            emailUser.provider = account.provider
            await emailUser.save()
          }
        }
        return true
      } catch (err) {
        return false
      }
    },
    async session({ session, token }) {
      // Check if the `sub` is a valid Mongoose ObjectId
      if (!session.user) return session

      if (mongoose.Types.ObjectId.isValid(token.sub || '')) {
        session.user.id = token.sub as string
      } else if (token.email) {
        const user = await User.findOne({ email: token.email, providerId: token.sub })

        if (user) session.user.id = user._id.toString()
      }
      return session
    },
  },
}
