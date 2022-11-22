import styles from "./BackgroundBlinder.module.css"
import { useCallback, useEffect, useState } from "react"
import { Property } from "csstype"
import TransitionTimingFunction = Property.TransitionTimingFunction
import TransitionDuration = Property.TransitionDuration

interface Points {
  center: number
  side: number
  transitionTimingFunction?: TransitionTimingFunction
  transitionDuration?: TransitionDuration
}

interface RectSize {
  width: number
  height: number
}

const animationLength = 400

interface Props {
  state: "none" | "header" | "fullscreen"
  headerHeightInPercentage: number
}

export default function BackgroundBlinder({
  state,
  headerHeightInPercentage,
}: Props) {
  const [points, setPoints] = useState<Points>({ center: 0, side: 0 })
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

  const createPath = (points: Points) => {
    return `M 0 0 L ${windowRect.width} 0 L ${windowRect.width} ${
      (points.side / 100) * windowRect.height
    } Q ${windowRect.width / 2} ${
      (points.center / 100) * windowRect.height
    } 0 ${(points.side / 100) * windowRect.height} Z`
  }

  const morphPath = useCallback(
    (to: number) => {
      const state = points
      const calcPoints = (animationProgress: Points): Points => {
        return {
          ...animationProgress,
          center:
            (to * animationProgress.center) / 100 +
            state.center * (1 - animationProgress.center / 100),
          side:
            (to * animationProgress.side) / 100 +
            state.side * (1 - animationProgress.side / 100),
        }
      }
      setPoints(
        calcPoints({
          side: 50 / 4,
          center: 50,
          transitionTimingFunction: "linear",
          transitionDuration: `${animationLength / 2}ms`,
        })
      )
      return [
        setTimeout(() => {
          setPoints(
            calcPoints({
              side: 100,
              center: 100,
              transitionTimingFunction: "linear",
              transitionDuration: `${animationLength / 2}ms`,
            })
          )
        }, animationLength / 2),
      ]
    },
    [state]
  )

  useEffect(() => {
    let timeouts: NodeJS.Timeout[]
    if (state === "header") {
      timeouts = morphPath(headerHeightInPercentage)
    } else {
      timeouts = morphPath(0)
    }
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [headerHeightInPercentage, morphPath, state])

  return (
    <svg
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      // viewBox={`0 0 ${windowRect.width} ${windowRect.height}`}
      className={styles.content}
    >
      <clipPath id="headerBg">
        <path
          d={createPath(points)}
          style={{
            transitionTimingFunction: points.transitionTimingFunction,
            transitionDuration: points.transitionDuration,
          }}
        />
      </clipPath>
    </svg>
  )
}
