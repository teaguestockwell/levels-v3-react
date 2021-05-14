import {debounce} from 'lodash'
import {useEffect, useState} from 'react'

export const useIsWidthGT = (breakPoint = 750, debounceDelay = 500) => {
  const [isWidthGT, setIsWidthGT] = useState(window.innerWidth > breakPoint)

  useEffect(() => {
    const handleWindowResize = () => {
      setIsWidthGT(window.innerWidth > breakPoint)
    }

    const debounced = debounce(handleWindowResize, debounceDelay)

    window.addEventListener('resize', debounced)
    return () => window.removeEventListener('resize', debounced)
  }, [])

  return {isWidthGT}
}
