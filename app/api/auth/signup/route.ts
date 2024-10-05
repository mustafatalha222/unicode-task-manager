import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI || '')

export async function POST(req: Request) {
  const { email, password } = await req.json()

  await client.connect()
  const usersCollection = client.db().collection('users')

  const existingUser = await usersCollection.findOne({ email })

  if (existingUser) {
    return NextResponse.json({ message: 'user_exists' }, { status: 409 })
  }

  await usersCollection.insertOne({ email, password })
  return NextResponse.json({ message: 'signup_success' }, { status: 201 })
}
