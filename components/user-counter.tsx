"use client"

import { useEffect, useState } from "react"

export function UserCounter() {
  const [count, setCount] = useState(252)

  useEffect(() => {
    async function fetchUserCount() {
      try {
        console.log("[v0] Fetching user count from /api/user-stats")
        const response = await fetch("/api/user-stats")
        console.log("[v0] Response status:", response.status)

        if (!response.ok) {
          console.log("[v0] Response not OK, using default 252")
          setCount(252)
          return
        }

        const data = await response.json()
        console.log("[v0] User stats data:", data)
        setCount(data.total_users || 252)
      } catch (error) {
        console.error("[v0] Failed to fetch user count:", error)
        setCount(252)
      }
    }

    fetchUserCount()
  }, [])

  return (
    <div>
      <div className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-white drop-shadow-lg text-center">
        {count}
      </div>
      <div className="text-sm text-white/60 text-center">Users Trained</div>
    </div>
  )
}
