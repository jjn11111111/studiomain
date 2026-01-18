"use client"

import { useEffect, useState } from "react"

export function UserCounter() {
  const [count, setCount] = useState(252)

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const response = await fetch("/api/user-stats")
        if (!response.ok) {
          setCount(252)
          return
        }
        const data = await response.json()
        setCount(data.total_users || 252)
      } catch (error) {
        setCount(252)
      }
    }

    fetchUserCount()
  }, [])

  return (
    <div>
      <div className="font-sans text-5xl font-bold text-white drop-shadow-lg text-center">
        {count}
      </div>
      <div className="text-sm text-white/60 text-center">Users Trained</div>
    </div>
  )
}
