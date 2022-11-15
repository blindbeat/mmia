import { CSSProperties, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { calcPathLength, inViewOptions } from "misc/utils"

function useAnimateLine() {
  const [ref, setRef] = useState<SVGSVGElement | null>(null)
  const { ref: observerRef, inView } = useInView(inViewOptions)
  const [style, setStyle] = useState<CSSProperties>({})

  const setBothRefs = (elem: SVGSVGElement | null) => {
    setRef(elem)
    observerRef(elem)
  }

  useEffect(() => {
    if (!ref) return
    const path = ref.querySelector("path")
    if (!path) return
    const lineLength = calcPathLength(path)
    setStyle({
      strokeDasharray: lineLength,
      strokeDashoffset: inView ? 0 : lineLength,
      transition: inView
        ? "stroke-dashoffset cubic-bezier(.18,.64,.78,.98) 7s"
        : undefined,
    })
  }, [ref, inView])
  return {
    ref: setBothRefs,
    style,
  }
}

export default useAnimateLine
