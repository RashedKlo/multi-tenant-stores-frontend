"use client"

import { useEffect } from "react"

export default function HomeError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-xl font-semibold text-red-600">Something went wrong.</p>
      <p className="max-w-md text-sm text-slate-600">Please refresh or try again later.</p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Retry
      </button>
    </div>
  )}
