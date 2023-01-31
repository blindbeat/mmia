import { useCallback, useEffect, useRef, useState } from "react"
import useResizeObserver from "@react-hook/resize-observer"

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
  }, [headerHeightSetter])

  useResizeObserver(ref.current, headerHeightSetter)
  return {
    ref,
    height,
  }
}
