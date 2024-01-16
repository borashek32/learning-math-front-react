import { useEffect } from "react"
import { useUsersQuery } from "./users.api"

export const Users = () => {
  const { data: users, error, isLoading } = useUsersQuery()

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div>

    </div>
  )
}