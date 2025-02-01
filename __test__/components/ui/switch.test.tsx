import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '@/components/ui/switch'

describe('Switch Component', () => {
  it('renders switch component', () => {
    render(<Switch data-testid="switch" />)
    const switchElement = screen.getByTestId('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('handles checked state', () => {
    render(<Switch data-testid="switch" />)
    const switchElement = screen.getByTestId('switch')
    
    fireEvent.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'checked')
    
    fireEvent.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })
}) 