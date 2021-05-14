import {useEffect, useState} from 'react'

export const useTick = (durationMs: number) => {
  const [tick, setTick] = useState(Date.now())

  useEffect(() => {
    const ticker = setTimeout(() => setTick(() => Date.now()), durationMs)
    return () => clearTimeout(ticker)
  }, [tick])

  return tick
}
