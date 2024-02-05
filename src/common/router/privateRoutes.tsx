import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Docs } from '../../features/math-operations/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { useRefreshQuery } from "../../features/auth/auth.api"
import { Loader } from "../components/loaders/CircularLoader"

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
  const { data, isLoading, isError } = useRefreshQuery()

  console.log(data)

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return null
  }

  const isAuthenticated = data ? true : false

  console.log(isAuthenticated)
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}