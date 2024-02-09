import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { Outlet, RouteObject } from 'react-router-dom'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { useMeQuery } from '../../features/auth/auth.api'
import { Docs } from '../../features/main/ui/docs/Docs'

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
  {
    path: "/verify/:verificationLink",
    element: <Verify />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/create-new-password/:passwordRecoveryCode/:email",
    element: <CreateNewPassword />
  },
]

export function PublicRoutes() {

  return <BaseLayout><Outlet /></BaseLayout>
}