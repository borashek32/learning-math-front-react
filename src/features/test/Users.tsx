import { useEffect } from "react"
import { useUsersQuery } from "./users.api"

export const Users = () => {
  const token = localStorage.getItem('accessToken')
  const { data: users, error, isLoading } = useUsersQuery()

  useEffect(() => {
    console.log(users)
  }, [token])

  return (
    <div>

    </div>
  )
}