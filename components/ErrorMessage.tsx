import { memo } from 'react'

type IError = {
  error?: string
}

function ErrorMessage({ error }: IError) {
  return <p className="text-red-500 mb-2 text-sm">{error}</p>
}

export default memo(ErrorMessage)
