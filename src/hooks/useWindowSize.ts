import { useEffect, useState } from 'react'

const breakPointsTailwind = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

export type Response = {
  isBrowser: boolean
  isMobile: boolean
  isTablet: boolean
  width?: number
  height?: number
}

const useWindowSize = (): Response => {
  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0

  const [width, setWidth] = useState(innerWidth)
  const [height, setHeight] = useState(innerHeight)

  const [devices, setDevices] = useState({
    isBrowser: true,
    isMobile: false,
    isTablet: false
  })

  useEffect(() => {
    if (innerWidth >= breakPointsTailwind.lg) {
      setDevices({
        isBrowser: true,
        isMobile: false,
        isTablet: false
      })
    } else if (
      innerWidth >= breakPointsTailwind.md &&
      innerWidth < breakPointsTailwind.lg
    ) {
      setDevices({
        isTablet: true,
        isBrowser: false,
        isMobile: false
      })
    } else if (innerWidth < breakPointsTailwind.md) {
      setDevices({
        isMobile: true,
        isTablet: false,
        isBrowser: false
      })
    }
  }, [innerWidth])

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    width,
    height,
    ...devices
  }
}

export default useWindowSize
