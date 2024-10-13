import ErrorMessage from '@/components/ErrorMessage'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('ErrorMessage', () => {
  it('renders the error message when provided', () => {
    const errorMessage = 'This is an error message.'
    render(<ErrorMessage error={errorMessage} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('text-red-500')
    expect(errorElement).toHaveClass('mb-2')
    expect(errorElement).toHaveClass('text-sm')
  })

  it('does not render anything when no error message is provided', () => {
    render(<ErrorMessage />)

    const errorElement = screen.queryByText(/./)
    expect(errorElement).not.toBeInTheDocument()
  })
})
