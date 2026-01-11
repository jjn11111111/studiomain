"use client"

import { useEffect, useState } from "react"

export function UserCounter() {
  const [userCount, setUserCount] = useState<number>(252)

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const response = await fetch("/api/user-stats")
        if (response.ok) {
          const data = await response.json()
          setUserCount(data.total_users || 252)
        }
      } catch (error) {
        console.error("Failed to fetch user count:", error)
      }
    }

    fetchUserCount()
  }, [])

  return (
    <div>
      <div className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-white drop-shadow-lg text-center">
        {userCount}
      </div>
      <div className="text-sm text-white/60 text-center">Users Trained</div>
    </div>
  )
}
