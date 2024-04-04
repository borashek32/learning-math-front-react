import { Main } from '../../features/main/ui/Main'
import { Register } from '../../features/auth/ui/Register'
import { Login } from '../../features/auth/ui/Login'
import { Verify } from '../../features/auth/ui/Verify'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { Outlet, RouteObject, useLocation } from 'react-router-dom'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { Docs } from '../../features/main/ui/docs/Docs'
import { MathOperations } from '../../features/math-operations/ui/MathOperations'
import { MultiplicationNumber } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationNumber"
import { Multiplication } from "../../features/math-operations/ui/multiplication/Multiplication"
import { SummDifference } from "../../features/math-operations/ui/summ-difference/SummDifference"
import { MultiplicationCheck } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationCheck"
import { MultiplicationNulls } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationNulls"
import { Equations } from "../../features/math-operations/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-operations/ui/equations/withX/EquationsWithX"
import { AppLayout } from '../components/layouts/AppLayout'
import { SchoolProgramm } from '../../features/school-programm/ui/SchoolProgram'
import { FirstGrade } from '../../features/school-programm/ui/first-grade/FirstGrade'
import { SecondGrade } from '../../features/school-programm/ui/second-grade/SecondGrade'
import { ThirdGrade } from '../../features/school-programm/ui/third-grade/ThirdGrade'
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

  // private routes
  {
    path: "/home/math-operations",
    element: <MathOperations />
  },
  {
    path: "/home/school-program",
    element: <SchoolProgramm />
  },
  {
    path: "/home/school-program/first-grade",
    element: <FirstGrade />
  },
  {
    path: "/home/school-program/second-grade",
    element: <SecondGrade />
  },
  {
    path: "/home/school-program/third-grade",
    element: <ThirdGrade />
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
  const instructions = location.pathname === "/instructions"
  if (instructions) {
    return <AvatarLayout><Docs /></AvatarLayout>
  }

  return <AppLayout><Outlet /></AppLayout>
}