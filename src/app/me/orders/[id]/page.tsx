'use client'
import { useParams } from "next/navigation"

function page() {
    const params = useParams()
    const { id:userId } = params
  return (
    <div>{userId}</div>
  )
}

export default page