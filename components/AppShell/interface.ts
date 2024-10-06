export type IElementSidebar = {
  icon: React.ReactNode
  name: string
  link: string
  selectable?: boolean
  handleClick?: () => void
}
