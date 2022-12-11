import { useCallback, useEffect, useRef, useState } from "react"

export const useCalcElementHeight = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  const headerHeightSetter = useCallback(() => {
    const elem = ref.current
    if (!elem) return
    setHeaderHeight(elem.offsetHeight)
  }, [])

  useEffect(() => {
    headerHeightSetter()
    window.addEventListener("resize", headerHeightSetter)
    return () => window.removeEventListener("resize", headerHeightSetter)
  }, [headerHeightSetter])
  return {
    ref,
    height: headerHeight,
  }
}
