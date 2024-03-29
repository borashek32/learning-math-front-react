import { useEffect, useState } from "react"
import { useUsersQuery } from "./users.api"
import { UserType } from "../auth/auth.api.types"

export const Users = () => {
  const { data: usersData, error, isLoading } = useUsersQuery()
  const [users, setUsers] = useState<UserType[] | undefined>([])

  useEffect(() => {
    setUsers(usersData)
  }, [usersData])

  return (
    <div>
      {users && users.map(user => usersData && 
        <div key={user._id} style={{ color: 'white' }}>{user.email}</div>
      )}
    </div>
  )
}