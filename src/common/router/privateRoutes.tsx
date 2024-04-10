import { useLocation, Outlet, RouteObject, Route } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { MathOperations } from '../../features/math-examples/ui/MathOperations'
import { Users } from '../../features/test/Users'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { YourScore } from "../../features/profile/ui/YourScore"
// import { MultiplicationTable } from "../../features/math-operations/ui/multiplication/multiplication-table/MultiplicationTable"
import { MultiplicationNumber } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNumber"
import { Multiplication } from "../../features/math-examples/ui/multiplication/Multiplication"
import { ChangeEmail } from "../../features/auth/ui/ChangeEmail"
import { useDispatch } from "react-redux"
import { ReactNode, useEffect } from "react"
import { removeUserInfo, setUserInfo } from "../../features/auth/auth.slice"
import { SummDifference } from "../../features/math-examples/ui/summ-difference/SummDifference"
import { MultiplicationCheck } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationCheck"
import { BaseLayout } from "../components/layouts/BaseLayout"
import { Login } from "../../features/auth/ui/Login"
import { useGetTotalUserScoreQuery } from "../../features/profile/profile.api"
import { setTotalUserScore } from "../../features/profile/profile.slice"
import { MultiplicationNulls } from "../../features/math-examples/ui/multiplication/multiplication-table/MultiplicationNulls"
import { Equations } from "../../features/math-examples/ui/equations/Equations"
import { EquationsWithX } from "../../features/math-examples/ui/equations/withX/EquationsWithX"
import { ChangeAvatar } from "../../features/profile/ui/ChangeAvatar"
import { AvatarLayout } from "../components/layouts/AvatarLayout"
import { Instructions } from "../../features/profile/ui/Instructions"
import { SchoolProgram } from "../../features/school-program/ui/SchoolProgram"
import { FirstGrade } from "../../features/school-program/ui/first-grade/FirstGrade"
import { SecondGrade } from "../../features/school-program/ui/second-grade/SecondGrade"
import { ThirdGrade } from "../../features/school-program/ui/third-grade/ThirdGrade"
import { PreSchool } from "../../features/pre-school/ui/PreSchool"
import { Numbers } from "../../features/pre-school/ui/numbers/Numbers"

const renderChangeAvatar = (): React.ReactNode => {
  return <AvatarLayout><ChangeAvatar /></AvatarLayout>;
}

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
    path: "/home/math-operations/docs",
    element: <Instructions />
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
    path: "/home/profile/choose-avatar",
    element: renderChangeAvatar()
  },
  {
    path: "/home/school-program",
    element: <SchoolProgram />
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
    path: "/home/pre-school",
    element: <PreSchool />
  },
  {
    path: "/home/pre-school/numbers",
    element: <Numbers />
  },
  {
    path: "users",
    element: <Users />
  }
]

export function PrivateRoutes() {
  const location = useLocation()
  const { data, isLoading } = useMeQuery()
  const { data: scoreData } = useGetTotalUserScoreQuery(data?._id)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfo(data))
      if (scoreData && scoreData.score !== undefined) {
        dispatch(setTotalUserScore(scoreData.score))
      }
    } else if (!isLoading && !data) {
      dispatch(removeUserInfo())
    }
  }, [data, isLoading, dispatch, scoreData])

  if (isLoading) {
    return <AppLayout><Loader /></AppLayout>
  }

  if (!data) {
    return <BaseLayout><Login /></BaseLayout>
  } 

  if (
    (data && location.pathname === "/") || 
    (data && location.pathname === "/login") ||
    (data && location.pathname === "/register")
  ) {
    return <AppLayout><Home /></AppLayout>
  }

  const isChooseAvatarRoute = location.pathname === "/home/profile/choose-avatar"
  if (isChooseAvatarRoute) {
    return  <AvatarLayout><ChangeAvatar /></AvatarLayout>
  }
  
  return <AppLayout><Outlet /></AppLayout>
}