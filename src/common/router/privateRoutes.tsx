import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Docs } from '../../features/math-operations/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { useMeQuery } from "../../features/auth/auth.api"
import { useState } from "react"
import { Modal } from "../components/modal/Modal"

export const privateRoutes: RouteObject[] = [
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/home/math-operations",
    element: <MathOperations />
  },
  {
    path: "/home/math-operations/summ",
    element: <Summ />
  },
  {
    path: "/home/math-operations/diff",
    element: <Diff />
  },
  {
    path: "/home/math-operations/docs",
    element: <Docs />
  },


  {
    path: "users",
    element: <Users />
  }
]

export function PrivateRoutes() {
  const { isLoading, isError } = useMeQuery()
  // const [open, setOpen] = useState(true)

  if (isLoading) {
    return null
  }

  // if (isError) {
  //   return <Modal
  //       open={open}
  //       setOpen={() => setOpen(false)}
  //       text={'User not authorized'}
  //       error={true}
  //     />
  // }

  const isAuthenticated = !isError

  // return <Outlet />
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}