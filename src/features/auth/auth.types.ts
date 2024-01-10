export type UserType = {
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

export type RegisterFormType = {
  email: string
  password: string
  passwordConfirmation: string
}