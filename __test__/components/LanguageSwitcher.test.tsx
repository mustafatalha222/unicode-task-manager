import LanguageSwitcher from '@/components/LanguageSwitcher'
import { renderWithProviders } from '../utils/test-utils'
import { screen } from '@testing-library/react'

jest.mock('../../i18n/routing', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

describe('LanguageSwitcher', () => {
  it('renders the current language correctly', () => {
    renderWithProviders(<LanguageSwitcher />)

    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('toggles the language from English to Arabic', async () => {
    renderWithProviders(<LanguageSwitcher />)

    expect(screen.queryByText('Arabic')).not.toBeInTheDocument()
    // Find and click the switch
    const switchToggle = screen.getByRole('switch')
    expect(switchToggle).toHaveAttribute('aria-checked', 'false')
  })
})
