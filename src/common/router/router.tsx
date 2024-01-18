import { createBrowserRouter } from 'react-router-dom'
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

export const router = createBrowserRouter([
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
])