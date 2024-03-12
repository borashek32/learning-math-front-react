import { Navigate, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Docs } from '../../features/main/ui/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { YourScore } from "../../features/profile/ui/YourScore"
import { MultiplicationTable } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationTable"
import { MultiplicationNumber } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationNumber"
import { Mult } from "../../features/math-operations/ui/multiplication/Multiplication"
import { ChangeEmail } from "../../features/auth/ui/ChangeEmail"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { removeUserInfo, setUserInfo } from "../../features/auth/auth.slice"
import { SummDifference } from "../../features/math-operations/ui/summ-difference/SummDifference"

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
    path: `/home/math-operations/:mathOperation`,
    element: <SummDifference />
  },
  {
    path: "/home/math-operations/mult",
    element: <Mult />
  },
  {
    path: "/home/math-operations/multiplication-table",
    element: <MultiplicationTable />
  },
  {
    path: "/home/math-operations/multiplication-table/:digit",
    element: <MultiplicationNumber />
  },

  {
    path: "users",
    element: <Users />
  }
]

export function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfo(data))
    } else if (!isLoading && !data) {
      dispatch(removeUserInfo())
    }
  }, [data, isLoading, dispatch])

  if (isLoading) {
    return <AppLayout><Loader /></AppLayout>
  }

  if (!data) {
    return <Navigate to="/login" />
  } 

  return <AppLayout><Outlet /></AppLayout>
}
