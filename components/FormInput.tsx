import { useField } from 'formik'
import ErrorMessage from '@/components/ErrorMessage'
import { useTranslations } from 'next-intl'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface FormInputProps {
  label: string
  name: string
  type?: string
  required?: boolean
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text', required = true }) => {
  // Using Formik's useField hook
  const [field, meta] = useField(name)
  const t = useTranslations()

  return (
    <div className="mb-4">
      <Label htmlFor={name}>{t(label)}</Label>
      {required && <span className="text-red-500">{` `}*</span>}

      <Input type={type} {...field} placeholder={t(label)} />
      {/* Show error message if the field has been touched and there's an error */}
      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </div>
  )
}

export default FormInput
