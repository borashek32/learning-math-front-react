export type Props = {
  onGenerateNewDigits: () => void
  onCheck: () => void
  right: boolean
  wrong: boolean
  onPressPlayMore: () => void
  onPressTryAgain: () => void
  score: number
}