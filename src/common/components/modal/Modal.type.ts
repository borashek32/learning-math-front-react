export type Props = {
  text: string
  buttonName?: string
  buttonCallback?: () => void
  open: boolean
  setOpen: (open: boolean) => void
  outlinedButton?: boolean
  error?: boolean
}