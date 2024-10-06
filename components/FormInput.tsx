import { useField } from 'formik'
import ErrorMessage from '@/components/ErrorMessage'

interface FormInputProps {
  label: string
  name: string
  type?: string
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text' }) => {
  // Using Formik's useField hook
  const [field, meta] = useField(name)

  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        {...field} // Spread field props (name, value, onChange, onBlur)
        type={type}
        className={`border rounded-md w-full py-2 px-3 mt-1 ${meta.touched && meta.error ? 'border-red-500' : ''}`}
      />
      {/* Show error message if the field has been touched and there's an error */}
      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </div>
  )
}

export default FormInput
