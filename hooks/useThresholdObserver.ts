import { useEffect, useState } from "react"

export const useThresholdObserver = (threshold: number) => {
  const [extendsThreshold, setExtendsThreshold] = useState(false)

  const thresholdController = (e: MediaQueryListEvent) => {
    setExtendsThreshold(e.matches)
  }

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${threshold}px)`)
    media.addEventListener("change", thresholdController)
    setExtendsThreshold(media.matches)
    return () => media.removeEventListener("change", thresholdController)
  }, [threshold])

  return extendsThreshold
}
