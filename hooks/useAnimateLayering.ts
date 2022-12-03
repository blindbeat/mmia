import { useScroll, useSpring, useTransform } from "framer-motion"
import { RefObject, useCallback, useEffect, useState } from "react"

const useAnimateLayering = (
  ref: RefObject<HTMLDivElement | null>,
  layerOffset: number
) => {
  const { scrollY } = useScroll()
  const [topOffset, setTopOffset] = useState(0)
  const [track, setTrack] = useState(0)
  const scrollYSmoothed = useSpring(scrollY, {
    damping: 15,
    mass: 0.05,
    stiffness: 500,
  })
  const y = useTransform(
    scrollYSmoothed,
    [topOffset - layerOffset, topOffset + track - layerOffset],
    [0, track],
    {
      ease: (num) => num,
    }
  )

  const setOffsetAndTrack = useCallback(() => {
    const elem = ref.current
    const parent = elem?.parentElement
    if (!elem || !parent) return
    setTopOffset(elem.offsetTop)
    setTrack(
      parent.offsetTop +
        parent.offsetHeight -
        elem.offsetTop -
        elem.offsetHeight
    )
  }, [ref])

  useEffect(() => {
    setOffsetAndTrack()
    window.addEventListener("resize", setOffsetAndTrack)
    return () => {
      window.removeEventListener("resize", setOffsetAndTrack)
    }
  }, [setOffsetAndTrack])

  return y
}
export default useAnimateLayering
