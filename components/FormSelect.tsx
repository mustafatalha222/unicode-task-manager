import { useField } from 'formik'
import ErrorMessage from '@/components/ErrorMessage'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useTranslations } from 'next-intl'
import { Label } from './ui/label'

interface FormSelectProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  required?: boolean
  disabled?: boolean
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, required = true, disabled = false }) => {
  const t = useTranslations()
  // Using Formik's useField hook
  const [field, meta, helpers] = useField(name)

  const handleChange = (value: string) => {
    helpers.setValue(value)
  }

  return (
    <div className="mb-4">
      <Label htmlFor={name}>{t(label)}</Label>
      {required && <span className="text-red-500">{` `}*</span>}

      <Select {...field} value={field.value} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={t(label)} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Show error message if the field has been touched and there's an error */}
      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </div>
  )
}

export default FormSelect
