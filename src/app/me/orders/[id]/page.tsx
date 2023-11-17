'use client'
import { useParams } from "next/navigation"

function page() {
    const params = useParams()
    const { id:userId } = params
  return (
    <div></div>
  )
}

export default page