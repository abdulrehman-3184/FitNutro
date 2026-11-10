import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Home() {
  const [status, setStatus] = useState('checking…')

  useEffect(() => {
    api<{ status: string }>('/health')
      .then((d) => setStatus(d.status))
      .catch(() => setStatus('offline'))
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <h1 className="text-4xl font-bold text-slate-900">FitNutro</h1>
      <p className="text-slate-600">AI-powered fitness &amp; nutrition</p>
      <p className="text-sm text-slate-500">Backend: {status}</p>
    </main>
  )
}
