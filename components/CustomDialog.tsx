import React, { ReactNode } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FaCheck, FaExclamation } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { CardHeader, CardTitle } from './ui/card'

type DialogCloseButtonProps = {
  cancelBtn?: string
  handleCancel?: () => void
  successBtn?: string
  handleSuccess?: () => void
  content: string | ReactNode
  children?: React.ReactNode
  open: boolean
  title?: string
  setOpen: (bool: boolean) => void
  successIcon?: boolean
  hideIcon?: boolean
  showCloseIcon?: boolean
}

const CustomDialog: React.FC<DialogCloseButtonProps> = ({
  cancelBtn,
  handleCancel,
  successBtn,
  handleSuccess,
  content,
  children,
  open,
  title,
  successIcon = true,
  hideIcon = false,
  showCloseIcon = false,
  setOpen,
}) => {
  const t = useTranslations()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen === true) return
        setOpen(!open)
      }}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-lg items-center" showCloseIcon={showCloseIcon}>
        {title && (
          <CardHeader className="justify-between items-center p-0 m-0">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}

        <div className={`flex flex-col justify-between items-center ${!hideIcon ? 'mt-4' : ''}`}>
          {!hideIcon && (
            <Avatar>
              <AvatarFallback className="bg-primary">
                {successIcon ? (
                  <FaCheck className="text-white" size={20} />
                ) : (
                  <FaExclamation className="text-white" size={20} />
                )}
              </AvatarFallback>
            </Avatar>
          )}
          {typeof content === 'string' ? <h1 className="text-center font-medium p-2">{t(content)}</h1> : <>{content}</>}

          {(successBtn || cancelBtn) && (
            <div className="flex gap-4 items-center mt-7 mb-3">
              {cancelBtn && (
                <Button className="w-40" variant={'secondary'} onClick={handleCancel || handleClose}>
                  {cancelBtn}
                </Button>
              )}
              {successBtn && (
                <Button className={`${cancelBtn ? 'w-40' : 'w-80'}`} type="submit" onClick={handleSuccess}>
                  {successBtn}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
