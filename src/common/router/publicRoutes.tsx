import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { Outlet, RouteObject, useLocation } from 'react-router-dom'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { Docs } from '../../features/main/ui/docs/Docs'
import { MathOperations } from '../../features/math-examples/ui/MathOperations'
import { MultiplicationNumber } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNumber"
import { Multiplication } from "../../features/math-examples/ui/multiplication/Multiplication"
import { SummDifference } from "../../features/math-examples/ui/summ-difference/SummDifference"
import { MultiplicationCheck } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationCheck"
import { MultiplicationNulls } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNulls"
import { Equations } from "../../features/math-examples/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-examples/ui/equations/withX/EquationsWithX"
import { AppLayout } from '../components/layouts/AppLayout'
import { AvatarLayout } from '../components/layouts/AvatarLayout'


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/instructions",
    element: <Docs />
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/verify/:verificationLink",
  //   element: <Verify />,
  // },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />
  // },
  // {
  //   path: "/create-new-password/:passwordRecoveryCode/:email",
  //   element: <CreateNewPassword />
  // },

  {
    path: "/home/math-operations",
    element: <MathOperations />
  },
  {
    path: `/home/math-operations/:mathOperation`,
    element: <SummDifference />
  },
  {
    path: "/home/math-operations/multiplication",
    element: <Multiplication />
  },
  {
    path: "/home/math-operations/multiplication/multiplication-table/:digit",
    element: <MultiplicationNumber />
  },
  {
    path: "/home/math-operations/multiplication/multiplication-table/numbers-with-nulls",
    element: <MultiplicationNulls />
  },
  {
    path: "/home/math-operations/multiplication/check-knowledge",
    element: <MultiplicationCheck />
  },
  {
    path: "/home/math-operations/equations",
    element: <Equations />
  },
  {
    path: "/home/math-operations/equations/with-one-unknown",
    element: <EquationsWithX />
  },
]

export function PublicRoutes() {
  const location = useLocation()
  
  const main = location.pathname === "/"
  if (main) {
    return  <BaseLayout><Main /></BaseLayout>
  }

  const register = location.pathname === "/register"
  if (register) {
    return <BaseLayout><Register /></BaseLayout>
  }
  
  const login = location.pathname === "/login"
  if (login) {
    return <BaseLayout><Login /></BaseLayout>
  }

  const instructions = location.pathname === "/instructions"
  if (instructions) {
    return <AvatarLayout><Docs /></AvatarLayout>
  }

  return <AppLayout><Outlet /></AppLayout>
}