import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Docs } from '../../features/math-operations/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
// import { useRefreshQuery } from "../../features/auth/auth.api"
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../features/auth/auth.selector"

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
    path: "/home/profile",
    element: <Profile />
  },
  {
    path: "/home/profile/change-password",
    element: <ChangePassword />
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

// export function PrivateRoutes() {
//   const { data, isLoading } = useMeQuery()

//   if (isLoading) {
//     return <Loader />
//   }

//   if (!data) {
//     return null
//   }

//   const isAuthenticated = data ? true : false
 
//   return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" />
// }

export const PrivateRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" />
}