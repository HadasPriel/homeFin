import { useState, useEffect } from 'react'

export const useScrolledToTop = (elementRef) => {
  const [isScrolledToTop, setIsScrolledToTop] = useState(true)

  const handleScroll = () => {
    const isCurrScrolledToTop = elementRef.current.scrollTop === 0
      setIsScrolledToTop(isCurrScrolledToTop)
  }

  useEffect(() => {
    elementRef.current.addEventListener('scroll', handleScroll)

    return () => {
      elementRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [elementRef])

  return isScrolledToTop
}

