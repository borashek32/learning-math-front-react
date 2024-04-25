import { ReactElement } from "react"
import { UserType } from "../../../features/auth/auth.api.types"

export type Props = {
  title?: string
  onPress?: () => void
  children: ReactElement[] | ReactElement | any
}

export type AppLayoutType = {
  user?: UserType
  children: ReactElement[] | ReactElement
}