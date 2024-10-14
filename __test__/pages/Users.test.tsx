import { render, screen } from '@testing-library/react'
import useApi from '@/hooks/useApi'
import Users from '@/app/[locale]/(protected)/users/page'
import { renderWithProviders } from '../utils/test-utils'

jest.mock('../../hooks/useApi')

describe('Users Component', () => {
  const mockUsers = [
    { _id: '1', name: 'User One', email: 'userone@example.com', image: '' },
    { _id: '2', name: 'User Two', email: 'usertwo@example.com', image: '' },
  ]

  const setup = () => {
    renderWithProviders(<Users />)
  }

  beforeEach(() => {
    jest.clearAllMocks() // Clear previous mock calls before each test
  })

  it('renders loading state', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: null, loading: true })
    setup()
    expect(screen.getByTestId('skeleton')).toBeInTheDocument() // Check for the skeleton
  })

  it('renders users list when data is available', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: { data: mockUsers }, loading: false })
    setup()
    expect(screen.getByText('All Users')).toBeInTheDocument()
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
      expect(screen.getByText(user.email)).toBeInTheDocument()
    })
  })

  it('renders no users message when data is empty', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: { data: [] }, loading: false })

    setup()
    expect(screen.getByText('No Data Found')).toBeInTheDocument()
  })
})
