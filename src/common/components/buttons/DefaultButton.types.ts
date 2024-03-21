import { FieldError } from "react-hook-form"

export type Props = {
  error?: FieldError | undefined
  type?: "button" | "submit" | "reset" | undefined
  name: string
  onClick?: () => void
  path?: string
  outlined?: boolean
  source?: string | undefined
  avatarName?: string
  onPress?: () => void
  onPressWithValue?: (value: string | undefined, avatarName: string | undefined) => void
}