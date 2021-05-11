import {debounce} from 'lodash'
import {useEffect, useState} from 'react'

export const useSize = (debounceDelay = 500) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    const debounced = debounce(handleWindowResize, debounceDelay)

    window.addEventListener('resize', debounced)
    return () => window.removeEventListener('resize', debounced)
  }, [])

  return {width, height}
}
