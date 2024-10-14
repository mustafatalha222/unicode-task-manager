import LanguageSwitcher from '@/components/LanguageSwitcher'
import renderer from 'react-test-renderer'
import { NextIntlClientProvider } from 'next-intl'

// Mock translations
const messages = {
  Lang: {
    switchLanguage: 'Switch Language',
  },
}

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

it('renderer language Switcher unchange', () => {
  const tree = renderer
    .create(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
