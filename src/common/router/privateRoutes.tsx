import { useLocation, Outlet, RouteObject } from "react-router-dom"
import { Home } from '../../features/home/ui/Home'
import { Users } from '../../features/test/Users'
import { Logout } from '../../features/auth/ui/Logout'
import { Loader } from "../components/loaders/CircularLoader"
import { ChangePassword } from "../../features/auth/ui/ChangePassword"
import { Profile } from "../../features/profile/ui/Profile"
import { useMeQuery } from "../../features/auth/auth.api"
import { AppLayout } from "../components/layouts/AppLayout"
import { YourScore } from "../../features/profile/ui/YourScore"
import { ChangeEmail } from "../../features/auth/ui/ChangeEmail"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { removeUserInfo, setUserInfo } from "../../features/auth/auth.slice"
import { useGetTotalUserScoreQuery } from "../../features/profile/profile.api"
import { setTotalUserScore } from "../../features/profile/profile.slice"
import { ChangeAvatar } from "../../features/profile/ui/ChangeAvatar"
import { AvatarLayout } from "../components/layouts/AvatarLayout"
import { Instructions } from "../../features/profile/ui/Instructions"
import { SchoolProgram } from "../../features/school-program/ui/SchoolProgram"
import { FirstGrade } from "../../features/school-program/ui/first-grade/FirstGrade"
import { SecondGrade } from "../../features/school-program/ui/second-grade/SecondGrade"
import { ThirdGrade } from "../../features/school-program/ui/third-grade/ThirdGrade"
import { PreSchool } from "../../features/pre-school/ui/PreSchool"
import { Numbers } from "../../features/pre-school/ui/numbers/Numbers"
import { Main } from "../../features/main/ui/Main"
import { BaseLayout } from "../components/layouts/BaseLayout"

// const renderChangeAvatar = (): React.ReactNode => {
//   return <AvatarLayout><ChangeAvatar /></AvatarLayout>;
// }

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
    element: <ChangeAvatar />
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
  const location = useLocation();
  const { data, isLoading } = useMeQuery();
  const { data: scoreData } = useGetTotalUserScoreQuery(data?._id);
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data));
      if (scoreData && scoreData.score !== undefined) {
        dispatch(setTotalUserScore(scoreData.score));
      }
    }
  }, [data, scoreData, dispatch]);

  if (isLoading) {
    return <AppLayout><Loader /></AppLayout>;
  }

  if (!data) {
    return <BaseLayout><Main /></BaseLayout>;
  }

  if (
    (data && location.pathname === "/") ||
    (data && location.pathname === "/login") ||
    (data && location.pathname === "/register")
  ) {
    return <AppLayout><Home /></AppLayout>;
  }

  const isChooseAvatarRoute = location.pathname === "/home/profile/choose-avatar";
  if (isChooseAvatarRoute) {
    return <AvatarLayout><ChangeAvatar /></AvatarLayout>;
  }

  return (
    <AppLayout key={location.pathname}>
      <Outlet />
    </AppLayout>
  );
}