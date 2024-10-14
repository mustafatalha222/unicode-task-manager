import SignupForm from '@/app/[locale]/(public)/signup/SignupForm'
import { renderWithProviders, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'

const SAMPLE_OBJ = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
}

describe('SignupForm', () => {
  const onSubmitMock = jest.fn()

  const setup = (loading = false) => {
    renderWithProviders(<SignupForm onSubmit={onSubmitMock} loading={loading} />)
  }

  it('renders the form inputs and submit button', () => {
    setup()

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('displays validation errors when inputs are invalid', async () => {
    setup()

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Name is a required field')).toBeInTheDocument()
      expect(screen.getByText('Email is a required field')).toBeInTheDocument()
      expect(screen.getByText('Password is a required field')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with valid form data', async () => {
    setup()

    await userEvent.type(screen.getByPlaceholderText(/name/i), SAMPLE_OBJ.name)
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
})
