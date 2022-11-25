import { CSSProperties, useCallback, useEffect, useState } from "react"
import { Property } from "csstype"
import TransitionTimingFunction = Property.TransitionTimingFunction
import TransitionDuration = Property.TransitionDuration

interface Params {
  state: "hidden" | "header" | "fullscreen"
  headerHeightInPercentage: number
  animationLength: number
}
interface RectSize {
  width: number
  height: number
}

interface PointsAndAnimation {
  center: number
  side: number
}

const useAnimateNavigation = ({
  state,
  headerHeightInPercentage,
}: Params): string => {
  // const [points, setPoints] = useState<PointsAndAnimation>({
  //   center: 0,
  //   side: 0,
  // })
  const [windowRect, setWindowRect] = useState<RectSize>({
    width: 0,
    height: 0,
  })

  const windowRectSetter = () => {
    setWindowRect({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    windowRectSetter()
    window.addEventListener("resize", windowRectSetter)
    return () => {
      window.removeEventListener("resize", windowRectSetter)
    }
  }, [])

  const createPath = (points: PointsAndAnimation) => {
    return `M 0 0 L ${windowRect.width} 0 L ${windowRect.width} ${
      (points.side / 100) * windowRect.height
    } Q ${windowRect.width / 2} ${
      (points.center / 100) * windowRect.height
    } 0 ${(points.side / 100) * windowRect.height} Z`
  }

  // const morphPath = useCallback(
  //   (to: number) => {
  //     const state = points
  //     const calcPoints = (
  //       animationProgress: PointsAndAnimation
  //     ): PointsAndAnimation => {
  //       return {
  //         ...animationProgress,
  //         center:
  //           (to * animationProgress.center) / 100 +
  //           state.center * (1 - animationProgress.center / 100),
  //         side:
  //           (to * animationProgress.side) / 100 +
  //           state.side * (1 - animationProgress.side / 100),
  //       }
  //     }
  //     setPoints(
  //       calcPoints({
  //         side: 100,
  //         center: 100,
  //       })
  //     )
  //   },
  //   [headerHeightInPercentage, state]
  // )

  // useEffect(() => {
  //   let timeouts: NodeJS.Timeout[]
  //   if (state === "header") {
  //     timeouts = morphPath(headerHeightInPercentage)
  //   } else {
  //     timeouts = morphPath(0)
  //   }
  //   return () => {
  //     timeouts.forEach((timeout) => clearTimeout(timeout))
  //   }
  // }, [headerHeightInPercentage, morphPath, state])

  const path =
    state === "header"
      ? createPath({
          center: headerHeightInPercentage,
          side: headerHeightInPercentage,
        })
      : createPath({ center: 0, side: 0 })

  return `path("${path}")`
}

export default useAnimateNavigation
