import { useState, useEffect } from 'react'

export const useScrolledToTop = (elementRef) => {
  const [isScrolledToTop, setIsScrolledToTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const isCurrScrolledToTop = elementRef.current.scrollTop === 0
      setIsScrolledToTop(isCurrScrolledToTop)
    }

    elementRef.current.addEventListener('scroll', handleScroll)

    return () => {
      elementRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [elementRef])

  return isScrolledToTop
}

