'use client'
import { useParams } from "next/navigation"

function usePage() {
  const params = useParams()
  return (
    <div>
        user orders will sit here
    </div>
  )
}

export default usePage