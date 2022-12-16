import { useCallback, useEffect, useRef, useState } from "react"

export const useCalcElementHeight = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const headerHeightSetter = useCallback(() => {
    const elem = ref.current
    if (!elem) return
    setHeight(elem.offsetHeight)
  }, [])

  useEffect(() => {
    headerHeightSetter()
    window.addEventListener("resize", headerHeightSetter)
    return () => window.removeEventListener("resize", headerHeightSetter)
  }, [headerHeightSetter])
  return {
    ref,
    height,
  }
}
