import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'
import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { Home } from '../../features/home/ui/Home'
import { Summ } from '../../features/math-operations/summ/Summ'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Users } from '../../features/test/Users'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Docs } from '../../features/math-operations/docs/Docs'
import { Logout } from '../../features/auth/ui/Logout'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { useMeQuery } from '../../features/auth/auth.api'

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
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

const privateRoutes: RouteObject[] = [
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

function PrivateRoutes() {
  const { isLoading, isError } = useMeQuery()

  if (isLoading) {
  return null
  }

  const isAuthenticated = !isError
 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes
])

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/verify/:verificationLink",
//     element: <Verify />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />
//   },
//   {
//     path: "/create-new-password/:passwordRecoveryCode/:email",
//     element: <CreateNewPassword />
//   },
//   // private routes
//   {
//     path: "/logout",
//     element: <Logout />
//   },
//   {
//     path: "/home",
//     element: <Home />
//   },
//   {
//     path: "/home/math-operations",
//     element: <MathOperations />
//   },
//   {
//     path: "/home/math-operations/summ",
//     element: <Summ />
//   },
//   {
//     path: "/home/math-operations/diff",
//     element: <Diff />
//   },
//   {
//     path: "/home/math-operations/docs",
//     element: <Docs />
//   },


//   {
//     path: "users",
//     element: <Users />
//   }
// ])