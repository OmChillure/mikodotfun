import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { waitlist } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'

export async function POST(request : any) {
  try {
    const body = await request.json()
    const { name, email, twitter } = body

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const existingUser = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, email.toLowerCase()))
      .limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: 'This email is already on the waitlist' },
        { status: 409 }
      )
    }

    const newEntry = await db
      .insert(waitlist)
      .values({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        twitter: twitter ? twitter.trim() : null,
      })
      .returning()

    const totalCount = await db
      .select({ count: count() })
      .from(waitlist)

    return NextResponse.json({
      message: 'Successfully joined the waitlist!',
      count: totalCount[0].count,
      id: newEntry[0].id
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const totalCount = await db
      .select({ count: count() })
      .from(waitlist)

    return NextResponse.json({
      count: totalCount[0].count
    })
  } catch (error) {
    console.error('Waitlist GET error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}