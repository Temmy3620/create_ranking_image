'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      ログアウト
    </button>
  )
}
