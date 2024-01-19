export type UserType = {
  id: string
  email: string
  password: string
  isVerified: boolean
  role: "USER" | "ADMIN"
  score: number
}

export type RegistedUserType = {
  accessToken: string
  refreshToken: string
  user: UserType
}

export type RegisterType = {
  email: string
  password: string
}

export type ForgotPasswordType = {
  email: string
  // recapcha: string
}

export type PasswordRecoveryType = {
  email: string | undefined
  password: string
  passwordRecoveryCode: string | undefined
}