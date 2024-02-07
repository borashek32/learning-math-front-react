import { ComponentPropsWithoutRef, Ref } from "react"
import { InputType } from "../../enums/enums"

export type Props = {
  ref?: Ref<HTMLInputElement>
  label: string
  value?: string
  disabled?: boolean
  placeholder: string
  error?: string
  type: InputType
  onFocus: () => void
  callback?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>