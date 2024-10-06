export type ISignUpValues = { name: string; email: string; password: string }

export type SignupFormProps = {
  onSubmit: (values: ISignUpValues) => void
  loading: boolean
}
