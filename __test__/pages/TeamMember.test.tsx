import { screen } from '@testing-library/react'
import useApi from '@/hooks/useApi'
import { renderWithProviders } from '../utils/test-utils'
import TeamMembers from '@/app/[locale]/(protected)/teamMembers/page'

jest.mock('../../hooks/useApi')

describe('Users Component', () => {
  const mockUsers = [
    { _id: 'member-1', user: { _id: 'user-2', name: 'John Doe' }, createdBy: { _id: 'user-1' }, role: 'member' },
    { _id: 'member-2', user: { _id: 'user-3', name: 'Jane Smith' }, createdBy: { _id: 'user-4' }, role: 'admin' },
  ]

  const setup = () => {
    renderWithProviders(<TeamMembers />)
  }

  beforeEach(() => {
    jest.clearAllMocks() // Clear previous mock calls before each test
  })

  it('renders loading state', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: null, loading: true })
    setup()
    expect(screen.getByTestId('skeleton')).toBeInTheDocument() // Check for the skeleton
  })

  it('renders members list and check for items count', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: { data: mockUsers }, loading: false })
    setup()
    expect(screen.getByRole('button', { name: /add team/i })).toBeInTheDocument()
    expect(screen.getByText('Team Members')).toBeInTheDocument()
    expect(screen.getByText('member')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    const renderedMembers = screen.getAllByRole('listitem') // Assuming each member is rendered as a <li> item
    expect(renderedMembers).toHaveLength(2)
  })

  it('renders no data message when data is empty', () => {
    ;(useApi as jest.Mock).mockReturnValue({ data: { data: [] }, loading: false })

    setup()
    expect(screen.getByText('No Data Found')).toBeInTheDocument()
  })
})
