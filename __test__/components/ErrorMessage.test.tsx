import ErrorMessage from '@/components/ErrorMessage'
import { render, screen } from '@testing-library/react'

describe('ErrorMessage', () => {
  it('renders the error message when provided', () => {
    const errorMessage = 'Method Not Allowed'
    render(<ErrorMessage error={errorMessage} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('text-red-500')
  })

  it('does not render anything when no error message is provided', () => {
    render(<ErrorMessage />)

    const errorElement = screen.queryByText(/./)
    expect(errorElement).not.toBeInTheDocument()
  })
})
