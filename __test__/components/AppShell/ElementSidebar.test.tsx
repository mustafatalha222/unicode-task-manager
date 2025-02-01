import { screen } from '@testing-library/react'
import ElementSidebar from '@/components/AppShell/ElementSidebar'
import { renderWithProviders } from '../../utils/test-utils'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import userEvent from '@testing-library/user-event'

jest.mock('../../../i18n/routing', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  usePathname: () => '/dashboard',
}))

describe('ElementSidebar', () => {
  const mockProps = {
    icon: <MdOutlineDashboardCustomize data-testid="mock-icon" />,
    link: '/dashboard',
    name: 'Dashboard',
    handleClick: jest.fn(),
  }

  const setup = (props = mockProps) => {
    renderWithProviders(<ElementSidebar {...props} />)
  }

  it('renders with correct props', () => {
    setup()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('applies selected styles when path matches', () => {
    setup()
    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-gray-100 border-l-4 border-primary')
  })

  it('calls handleClick when clicked', async () => {
    setup()
    await userEvent.click(screen.getByRole('link'))
    expect(mockProps.handleClick).toHaveBeenCalled()
  })
}) 