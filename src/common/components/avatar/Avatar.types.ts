export type Props = {
  source: string
  name: string
  status?: string
  species?: string
  location?: string
  onPress: (source: string, name: string) => void
}

export type UserAvatarProps = {
  source?: string
  avatarName?: string
  small?: boolean
}