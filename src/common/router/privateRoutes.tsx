import { Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { AppLayout } from "../components/layouts/AppLayout"
import { YourScore } from "../../features/profile/ui/YourScore"
import { ChangeEmail } from "../../features/auth/ui/ChangeEmail"
import { ChangeAvatar } from "../../features/profile/ui/ChangeAvatar"
import { SchoolProgram } from "../../features/school-program/ui/SchoolProgram"
import { FirstGrade } from "../../features/school-program/ui/first-grade/FirstGrade"
import { SecondGrade } from "../../features/school-program/ui/second-grade/SecondGrade"
import { ThirdGrade } from "../../features/school-program/ui/third-grade/ThirdGrade"
import { PreSchool } from "../../features/pre-school/ui/PreSchool"
import { Numbers } from "../../features/pre-school/ui/numbers/Numbers"
import { Main } from "../../features/main/ui/Main"
import { BaseLayout } from "../components/layouts/BaseLayout"
import { MathExamples } from "../../features/math-examples/ui/MathExamples"
import { MathExample } from "../../features/math-examples/ui/math-example/MathExample"
import { Multiplication } from "../../features/math-examples/ui/multiplication/Multiplication"
import { Equations } from "../../features/math-examples/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-examples/ui/equations/withX/EquationsWithX"
import { Docs } from "../../features/main/ui/docs/Docs"
import { useAuth } from "../hooks/useAuth/useAuth"
import { PRIVATE_PATHS } from "../constants/paths/privatePaths"
import { MultiplicationTable } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationTable"

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_PATHS.LOGOUT,
    element: <Logout />
  },
  {
    path: PRIVATE_PATHS.HOME,
    element: <Home />
  },
  {
    path: PRIVATE_PATHS.PROFILE,
    element: <Profile />
  },
  {
    path: PRIVATE_PATHS.INSTRUCTIONS,
    element: <Docs />
  },
  {
    path: PRIVATE_PATHS.YOUR_SCORE,
    element: <YourScore />
  },
  {
    path: PRIVATE_PATHS.CHANGE_PASSWORD,
    element: <ChangePassword />
  },
  {
    path: PRIVATE_PATHS.CHANGE_EMAIL,
    element: <ChangeEmail />
  },
  {
    path: PRIVATE_PATHS.CHANGE_AVATAR,
    element: <ChangeAvatar />
  },

  {
    path: PRIVATE_PATHS.MATH_EXAMPLES,
    element: <MathExamples />
  },
  {
    path: `${PRIVATE_PATHS.MATH_EXAMPLES}/:mathOperation`,
    element: <MathExample />
  },
  {
    path: PRIVATE_PATHS.MULTIPLICATION,
    element: <Multiplication />
  },
  { // navigation to multiplication table
    path: PRIVATE_PATHS.MULTIPLICATION_TABLE,
    element: <MultiplicationTable />
  },
  { // multiply by number
    path: `${PRIVATE_PATHS.MULTIPLICATION_TABLE}/:mathOperation/:digit`,
    element: <MathExample />
  },
  { // multiplication numbers with nulls
    path: `${PRIVATE_PATHS.MULTIPLICATION}/:mathOperation/:digit`,
    element: <MathExample />
  },
  { // check multiplication knowledge
    path: `${PRIVATE_PATHS.MULTIPLICATION_TABLE}/:mathOperation`,
    element: <MathExample />
  },
  {
    path: PRIVATE_PATHS.EQUATIONS,
    element: <Equations />
  },
  {
    path: PRIVATE_PATHS.EQUATIONS_WITH_X,
    element: <EquationsWithX />
  },

  {
    path: PRIVATE_PATHS.SCHOOL_PROGRAM,
    element: <SchoolProgram />
  },
  {
    path: PRIVATE_PATHS.FIRST_GRADE,
    element: <FirstGrade />
  },
  {
    path: PRIVATE_PATHS.SECOND_GRADE,
    element: <SecondGrade />
  },
  {
    path: PRIVATE_PATHS.THIRD_GRADE,
    element: <ThirdGrade />
  },
  {
    path: PRIVATE_PATHS.PRE_SCHOOL,
    element: <PreSchool />
  },
  {
    path: PRIVATE_PATHS.NUMBERS,
    element: <Numbers />
  },
]

export function PrivateRoutes() {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <AppLayout><Loader /></AppLayout>
  }

  if (!isLoggedIn) {
    return <BaseLayout><Main /></BaseLayout>
  }

  return <AppLayout><Outlet /></AppLayout>
}