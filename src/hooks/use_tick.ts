import { useEffect, useState } from "react"

export const useTick = (durationMs:number) => {
  const [ tick, setTick ] = useState(Date.now())

  // start a clock to schedule updates to TextLoop,
  // since there are 3 rows @ 3s ea, update once every 9s
  useEffect(() => {
    // tick every 9 seconds to allow spinner to  cycle
    const ticker = setTimeout(() => setTick(() => Date.now()), durationMs)
    return () => clearTimeout(ticker)
  }, [tick])

  return tick
}