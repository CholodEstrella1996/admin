type LoginData = {
  email: string
  password: string
}

export type LoginHandler = ({ email, password }: LoginData) => Promise<void>

export type Inputs = LoginData
