'use client'
import { useParams } from "next/navigation"

function usePage() {
    const params = useParams()
    const {id} = params
  return (
    <div>{id}</div>
  )
}

export default usePage