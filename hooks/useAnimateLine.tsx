import { CSSProperties, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { inViewOptions } from "misc/utils"

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
    const lineLength = ref.querySelector("path")?.getTotalLength()
    setStyle({
      strokeDasharray: lineLength,
      strokeDashoffset: inView ? 0 : lineLength,
      transition: inView ? "stroke-dashoffset linear 5s" : undefined,
    })
  }, [ref, inView])
  return {
    ref: setBothRefs,
    style,
  }
}

export default useAnimateLine
