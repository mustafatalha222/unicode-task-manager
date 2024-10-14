import LoginForm from '@/app/[locale]/(public)/login/LoginForm'
import { renderWithProviders, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'

const SAMPLE_OBJ = {
  email: 'john@example.com',
  password: 'password123',
}

describe('LoginForm', () => {
  const onSubmitMock = jest.fn()
  const onGithubSignInMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = (loading = false) => {
    renderWithProviders(<LoginForm onSubmit={onSubmitMock} loading={loading} onGithubSignIn={onGithubSignInMock} />)
  }

  it('renders the form inputs and submit button', () => {
    setup()

    expect(screen.getByText(/email/i)).toBeInTheDocument()
    expect(screen.getByText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('displays validation errors when inputs are invalid', async () => {
    setup()

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Email is a required field')).toBeInTheDocument()
      expect(screen.getByText('Password is a required field')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with valid form data', async () => {
    setup()

    await userEvent.type(screen.getByPlaceholderText(/email/i), SAMPLE_OBJ.email)
    await userEvent.type(screen.getByPlaceholderText(/password/i), SAMPLE_OBJ.password)

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(expect.objectContaining(SAMPLE_OBJ), expect.anything())
    })
  })

  it('disables the submit button when loading', () => {
    setup(true)
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  it('calls onGithubSignIn when GitHub button is clicked', async () => {
    setup()

    await userEvent.click(screen.getByRole('button', { name: /GitHub/i }))
    expect(onGithubSignInMock).toHaveBeenCalled()
  })
})
