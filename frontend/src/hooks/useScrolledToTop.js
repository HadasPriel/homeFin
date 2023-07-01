import { useState, useEffect } from 'react'

export const useScrolledToTop = (elementRef) => {
  const [isScrolledToTop, setIsScrolledToTop] = useState(true)

  window.insideHook = elementRef
  const handleScroll = () => {
    console.log('elementRef:', elementRef)
    console.log('runnn')
    const isCurrScrolledToTop = elementRef.current.scrollTop === 0
    setIsScrolledToTop(isCurrScrolledToTop)
  }


  useEffect(() => {
    console.log('useeffect...')
    const currElement = elementRef.current;
    if (currElement) {
      currElement.addEventListener('scroll', handleScroll);

      return () => {
        currElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [elementRef.current]);

  return isScrolledToTop
}

