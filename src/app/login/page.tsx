'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('') // リセット

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })

    if (res.ok) {
      router.push('/')
    } else {
      const data = await res.json()
      setError(data.message || 'ログインに失敗しました')
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl mb-6">ログイン</h1>

      <div className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <button
          onClick={handleLogin}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          ログイン
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  )
}
