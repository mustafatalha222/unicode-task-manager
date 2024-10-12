import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
}

function CustomSkeleton({
  className,
  loading = false,
  length = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { loading: boolean; length: number }) {
  const t = useTranslations()
  return (
    <>
      {loading && !length ? (
        <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
      ) : (
        !length && <h4 className="text-xl font-bold flex justify-center">{t('No Data Found')}</h4>
      )}
    </>
  )
}

export { Skeleton, CustomSkeleton }
