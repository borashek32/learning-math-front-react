import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/ui/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/ui/diff/Diff'
import { Docs } from '../../features/main/ui/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { YourScore } from "../../features/profile/ui/YourScore"
import { MultTable } from "../../features/math-operations/ui/multTable/MultTable"
import { MultByDigit } from "../../features/math-operations/ui/multTable/multByDigit/MultByDigit"
import { Mult } from "../../features/math-operations/ui/mult/Mult"
import { ChangeEmail } from "../../features/auth/ui/ChangeEmail"

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
    path: "/home/profile/your-score",
    element: <YourScore />
  },
  {
    path: "/home/profile/change-password",
    element: <ChangePassword />
  },
  {
    path: "/home/profile/change-email",
    element: <ChangeEmail />
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
    path: "/home/math-operations/mult",
    element: <Mult />
  },
  {
    path: "/home/math-operations/multiplication-table",
    element: <MultTable />
  },
  {
    path: "/home/math-operations/multiplication-table/:digit",
    element: <MultByDigit />
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