export type ILoginValues = { email: string; password: string }

export type LoginFormProps = {
  onSubmit: (values: ILoginValues) => void
  loading: boolean
  onGithubSignIn: () => void
}
