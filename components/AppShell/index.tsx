import { IoPersonOutline } from 'react-icons/io5'
import { MdGroups, MdOutlineDashboardCustomize } from 'react-icons/md'
import { TiDocumentText } from 'react-icons/ti'
import ElementSidebar from './ElementSidebar'
import Logout from './Logout'
import Header from './Header'
import Image from 'next/image'
import { IElementSidebar } from './interface'
import LanguageSwitcher from '../LanguageSwitcher'

type SidebarDemoProps = {
  children: React.ReactNode
}

const SIDE_MENU: IElementSidebar[] = [
  {
    link: '/dashboard',
    name: 'Dashboard',
    icon: <MdOutlineDashboardCustomize size={20} />,
  },
  {
    link: '/users',
    name: 'Users',
    icon: <MdGroups size={24} />,
  },
  {
    link: '/teamMembers',
    name: 'Team Members',
    icon: <MdGroups size={24} />,
  },
  {
    link: '/tasks',
    name: 'Tasks',
    icon: <TiDocumentText size={20} />,
  },
  {
    link: '/profile',
    name: 'Profile',
    icon: <IoPersonOutline size={20} />,
  },
]

const AppShell = ({ children }: SidebarDemoProps) => (
  <div className="flex">
    <div className="flex flex-col h-screen justify-between bg-white w-[17rem]">
      <div className="space-y-3">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" className="p-2" alt="Logo" width={50} height={50} />
        </div>

        <div className="flex-1 pt-3">
          <ul className="space-y-2 text-sm">
            {SIDE_MENU.map((e) => (
              <li key={e.name}>
                <ElementSidebar {...e} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pb-4">
        <div className="px-6 mb-3">
          <LanguageSwitcher />
        </div>
        <Logout />
      </div>
    </div>

    <div className="bg-white shadow w-[100%]">
      <Header />
      <div className="mx-auto bg-primaryBg py-3 px-5 min-h-[92vh]">{children}</div>
    </div>
  </div>
)

export default AppShell
