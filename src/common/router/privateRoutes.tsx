import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Docs } from '../../features/main/ui/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { PrivateDocs } from "../../features/math-operations/private-docs/PrivateDocs"

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
    path: "/home/math-operations/private-instructions",
    element: <PrivateDocs />
  },


  {
    path: "users",
    element: <Users />
  }
]

export function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return <Navigate to="/login" />
  } 
  
  return <AppLayout><Outlet /></AppLayout>
}