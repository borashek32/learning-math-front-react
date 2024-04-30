import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { Outlet, RouteObject } from 'react-router-dom'
import { Docs } from '../../features/main/ui/docs/Docs'
import { MathExamples } from '../../features/math-examples/ui/MathExamples'
import { Multiplication } from "../../features/math-examples/ui/multiplication/Multiplication"
import { MathExample } from "../../features/math-examples/ui/math-example/MathExample"
import { Equations } from "../../features/math-examples/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-examples/ui/equations/withX/EquationsWithX"
import { AppLayout } from '../components/layouts/AppLayout'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { Home } from '../../features/home/ui/Home'
import { Loader } from '../components/loaders/CircularLoader'
import { useAuth } from '../hooks/useAuth/useAuth'
import { PUBLIC_PATHS } from '../constants/paths/publicPaths'
import { MultiplicationTable } from '../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationTable'

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_PATHS.MAIN,
    element: <Main />,
  },
  {
    path: PUBLIC_PATHS.INSTRUCTIONS,
    element: <Docs />
  },
  {
    path: PUBLIC_PATHS.REGISTER,
    element: <Register />,
  },
  {
    path: PUBLIC_PATHS.LOGIN,
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
    path: PUBLIC_PATHS.MATH_EXAMPLES,
    element: <MathExamples />
  },
  {
    path: `${PUBLIC_PATHS.MATH_EXAMPLES}/:mathOperation`,
    element: <MathExample />
  },
  {
    path: PUBLIC_PATHS.MULTIPLICATION,
    element: <Multiplication />
  },
  { // navigation to multiplication table
    path: PUBLIC_PATHS.MULTIPLICATION_TABLE,
    element: <MultiplicationTable />
  },
  { // multiply by number
    path: `${PUBLIC_PATHS.MULTIPLICATION_TABLE}/:mathOperation/:digit`,
    element: <MathExample />
  },
  { // multiplication numbers with nulls
    path: `${PUBLIC_PATHS.MULTIPLICATION}/:mathOperation/:digit`,
    element: <MathExample />
  },
  { // check multiplication knowledge
    path: `${PUBLIC_PATHS.MULTIPLICATION_TABLE}/:mathOperation`,
    element: <MathExample />
  },
  {
    path: PUBLIC_PATHS.EQUATIONS,
    element: <Equations />
  },
  {
    path: PUBLIC_PATHS.EQUATIONS_WITH_X,
    element: <EquationsWithX />
  },
]

export function PublicRoutes() {
  const { isLoading, isLoggedIn } = useAuth()

  if (isLoading) {
    return <AppLayout><Loader /></AppLayout>
  }

  if (isLoggedIn) {
    return <AppLayout><Home /></AppLayout>
  }

  return <BaseLayout><Outlet /></BaseLayout>
}