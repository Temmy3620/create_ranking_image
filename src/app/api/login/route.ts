import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { id, password } = body

  if (
    id === process.env.LOGIN_ID &&
    password === process.env.LOGIN_PASSWORD
  ) {
    // セッション代わりにクッキーを設定
    const res = NextResponse.json({ success: true })
    res.cookies.set('session', 'authenticated', { httpOnly: true })
    return res
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}
