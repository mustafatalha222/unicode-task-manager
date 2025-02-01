import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('renders input with default props', () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('handles value changes', () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId('input')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveValue('test')
  })

  it('applies custom className', () => {
    render(<Input data-testid="input" className="custom-class" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-class')
  })
}) 