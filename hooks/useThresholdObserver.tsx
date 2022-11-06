import { useEffect, useState } from "react"

function useThresholdObserver(threshold: number) {
  const [extendsThreshold, setExtendsThreshold] = useState(false)

  useEffect(() => {
    const thresholdController = () => {
      const defineExtendsThreshold = (windowWidth: number) =>
        windowWidth > threshold

      setExtendsThreshold(defineExtendsThreshold(window.innerWidth))
    }
    window.addEventListener("resize", thresholdController)
  }, [threshold])

  return extendsThreshold
}

export default useThresholdObserver
