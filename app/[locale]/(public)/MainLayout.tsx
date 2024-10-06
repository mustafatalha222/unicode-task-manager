import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type IMainLayout = {
  children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
  const t = useTranslations('MainLayout')

  return (
    <main className="h-screen flex flex-col items-center">
      <header className="flex justify-between mt-5 mb-10 w-4/5">
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="star logo" width={50} height={50} />
          <h1 className="my-2 md:hidden text-4xl font-bold text-primary">{t('task_management')}</h1>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="flex md:flex-row justify-evenly w-full">
        <aside className="hidden md:flex mt-20 flex-col items-start text-left">
          <h1 className="my-2 text-4xl font-bold text-primary">{t('collaborative')}</h1>
          <h1 className="my-2 text-4xl font-bold text-primary">{t('task_management')}</h1>
          <p className="my-5 mx-2 text-lg font-medium text-gray-500">{t('task_description')}</p>
        </aside>

        <article className="w-11/12 md:w-[430px] p-8 bg-primaryBg shadow-xl rounded-lg">{children}</article>
      </section>
    </main>
  )
}
