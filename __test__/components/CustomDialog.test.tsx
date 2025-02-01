import { screen } from '@testing-library/react'
import CustomDialog from '@/components/CustomDialog'
import { renderWithProviders } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'

describe('CustomDialog', () => {
  const mockProps = {
    open: true,
    setOpen: jest.fn(),
    content: 'Test Content',
    successBtn: 'OK',
    cancelBtn: 'Cancel',
    handleSuccess: jest.fn(),
    handleCancel: jest.fn(),
    title: '',
    hideIcon: false,
  }

  const setup = (props = mockProps) => {
    renderWithProviders(<CustomDialog {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dialog content when open', () => {
    setup()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders success and cancel buttons', () => {
    setup()
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls handleSuccess when success button is clicked', async () => {
    setup()
    await userEvent.click(screen.getByText('OK'))
    expect(mockProps.handleSuccess).toHaveBeenCalled()
  })

  it('calls handleCancel when cancel button is clicked', async () => {
    setup()
    await userEvent.click(screen.getByText('Cancel'))
    expect(mockProps.handleCancel).toHaveBeenCalled()
  })

  it('renders with custom title when provided', () => {
    setup({ ...mockProps, title: 'Custom Title' })
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('hides icon when hideIcon is true', () => {
    setup({ ...mockProps, hideIcon: true })
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
}) 