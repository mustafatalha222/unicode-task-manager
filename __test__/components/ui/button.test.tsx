import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    render(<Button data-testid="button">Click me</Button>)
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('h-9')
  })

  it('renders with different variants', () => {
    const variants = ['destructive', 'outline', 'secondary', 'ghost', 'link']
    variants.forEach(variant => {
      render(<Button variant={variant as any} data-testid={`button-${variant}`}>Button</Button>)
      const button = screen.getByTestId(`button-${variant}`)
      expect(button).toBeInTheDocument()
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon']
    sizes.forEach(size => {
      render(<Button size={size as any} data-testid={`button-${size}`}>Button</Button>)
      const button = screen.getByTestId(`button-${size}`)
      expect(button).toBeInTheDocument()
    })
  })

  it('renders as child when asChild prop is true', () => {
    render(
      <Button asChild data-testid="button-child">
        <a href="#">Link Button</a>
      </Button>
    )
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
}) 