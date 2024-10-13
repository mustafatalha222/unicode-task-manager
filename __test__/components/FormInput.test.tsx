import { screen } from '@testing-library/react'
import FormInput from '@/components/FormInput'
import { Formik } from 'formik'
import { renderWithProviders } from '../utils/test-utils'

const LABEL = 'Name'

const setup = (initialValues = { testField: '' }) => {
  return renderWithProviders(
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <FormInput label={LABEL} name="testField" />
    </Formik>
  )
}
describe('FormInput Component', () => {
  it('renders label and input field', () => {
    setup()
    expect(screen.getByText(LABEL)).toBeInTheDocument()
  })

  it('displays required asterisk when required prop is true', () => {
    setup()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not display required asterisk when required prop is false', () => {
    renderWithProviders(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <FormInput label={LABEL} name="name" required={false} />
      </Formik>
    )
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })
})
