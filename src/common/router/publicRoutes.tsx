import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { Outlet, RouteObject, useLocation } from 'react-router-dom'
import { Docs } from '../../features/main/ui/docs/Docs'
import { MathOperations } from '../../features/math-examples/ui/MathOperations'
import { MultiplicationNumber } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNumber"
import { Multiplication } from "../../features/math-examples/ui/multiplication/Multiplication"
import { SumDifference } from "../../features/math-examples/ui/sum-difference/SumDifference"
import { MultiplicationCheck } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationCheck"
import { MultiplicationNulls } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNulls"
import { Equations } from "../../features/math-examples/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-examples/ui/equations/withX/EquationsWithX"
import { AppLayout } from '../components/layouts/AppLayout'
import { AvatarLayout } from '../components/layouts/AvatarLayout'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { UnAuthLayout } from '../components/layouts/UnAuthLayout'
import { DocsLayout } from '../components/layouts/DocsLayout'

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
    path: "/math-operations",
    element: <MathOperations />
  },
  {
    path: `/math-operations/:mathOperation`,
    element: <SumDifference />
  },
  {
    path: "/math-operations/multiplication",
    element: <Multiplication />
  },
  {
    path: "/math-operations/multiplication/multiplication-table/:digit",
    element: <MultiplicationNumber />
  },
  {
    path: "/math-operations/multiplication/multiplication-table/numbers-with-nulls",
    element: <MultiplicationNulls />
  },
  {
    path: "/math-operations/multiplication/check-knowledge",
    element: <MultiplicationCheck />
  },
  {
    path: "/math-operations/equations",
    element: <Equations />
  },
  {
    path: "/math-operations/equations/with-one-unknown",
    element: <EquationsWithX />
  },
]

export function PublicRoutes() {
  const location = useLocation()

  if (location.pathname === '/instructions') {
    return <DocsLayout><Docs /></DocsLayout>
  }

  if (location.pathname === '/') {
    return <BaseLayout><Main /></BaseLayout>
  }

  return <UnAuthLayout><Outlet /></UnAuthLayout>
}