import { TITLE_MAP } from './constant'

export const getTitleByPathname = (pathname: string): string => {
  // Check for exact match
  if (TITLE_MAP[pathname]) return TITLE_MAP[pathname]

  // Check for starting match
  const startingMatch = Object.keys(TITLE_MAP).find((key) => {
    const keys = key.split('/')
    const pathSegments = pathname.split('/')

    // Check if the lengths match /:id
    if (keys.length === pathSegments.length) {
      // Check for dynamic segments
      const match = keys.every((segment, index) => segment.startsWith(':') || segment === pathSegments[index])
      return match
    }

    return false
  })

  if (startingMatch) return TITLE_MAP[startingMatch]
  return ''
}
