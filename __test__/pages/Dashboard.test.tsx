import Dashboard from '@/app/[locale]/(protected)/dashboard/page'
import { renderWithProviders, screen, waitFor } from '../utils/test-utils'
import useApi from '@/hooks/useApi'
import userEvent from '@testing-library/user-event'

jest.mock('../../hooks/useApi')
jest.mock('../../lib/socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}))

describe('Dashboard', () => {
  const mockTasks = [
    { id: '1', status: 'pending', createdAt: '2024-03-20T10:00:00Z' },
    { id: '2', status: 'completed', createdAt: '2024-03-21T10:00:00Z' },
  ]

  const setup = (loading = false, data = mockTasks) => {
    const refreshMock = jest.fn()
    ;(useApi as jest.Mock).mockReturnValue({
      data: { data },
      loading,
      refresh: refreshMock,
    })
    renderWithProviders(<Dashboard />)
    return { refreshMock }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dashboard title and refresh button', () => {
    setup()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
  })

  it('renders charts when data is loaded', () => {
    setup(false)
    expect(screen.getByText('Tasks By Status')).toBeInTheDocument()
    expect(screen.getByText('Tasks Timeline')).toBeInTheDocument()
  })

  it('calls refresh function when refresh button is clicked', async () => {
    const { refreshMock } = setup()
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    
    await userEvent.click(refreshButton)
    expect(refreshMock).toHaveBeenCalled()
  })

  it('disables refresh button during loading', () => {
    setup(true)
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    expect(refreshButton).toBeDisabled()
  })
}) 