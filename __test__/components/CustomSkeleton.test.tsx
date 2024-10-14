import { screen } from '@testing-library/react'
import { CustomSkeleton } from '@/components/ui/skeleton'
import { renderWithProviders } from '../utils/test-utils'

describe('CustomSkeleton', () => {
  const setup = (loading = false, length = 0, className = '') => {
    renderWithProviders(<CustomSkeleton loading={loading} length={length} className={className} />)
  }

  beforeEach(() => {
    jest.clearAllMocks() // Clear previous mock calls before each test
  })

  it('renders skeleton when loading is true and length is 0', () => {
    setup(true, 0, 'custom-class')

    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
  })

  it('renders "No Data Found" when loading is false and length is 0', () => {
    setup(false, 0)

    const noDataText = screen.getByText('No Data Found')
    expect(noDataText).toBeInTheDocument()
  })

  it('renders nothing when loading is false and length is greater than 0', () => {
    setup(false, 1)
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument() // Should render nothing
  })
})
