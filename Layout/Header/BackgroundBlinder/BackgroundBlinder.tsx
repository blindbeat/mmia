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
  state: "transparent" | "header" | "fullscreen"
  headerHeightInPercentage: number
  color: string
}

export default function BackgroundBlinder({
  state,
  color,
  headerHeightInPercentage,
}: Props) {
  const [points, setPoints] = useState<Points>({ center: 0, side: 0 })
  const [rect, setRect] = useState<RectSize>({ width: 0, height: 0 })

  const rectSetter = () => {
    setRect({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    rectSetter()
    window.addEventListener("resize", rectSetter)
    return () => {
      window.removeEventListener("resize", rectSetter)
    }
  }, [])

  const createPath = (points: Points) => {
    return `M 0 0 L ${rect.width} 0 L ${rect.width} ${
      (points.side / 100) * rect.height
    } Q ${rect.width / 2} ${(points.center / 100) * rect.height} 0 ${
      (points.side / 100) * rect.height
    } Z`
  }

  const morphPath = useCallback((to: number) => {
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
  }, [])

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
      viewBox={`0 0 ${rect.width} ${rect.height}`}
      className={styles.content}
      style={{
        backgroundColor: color,
        clipPath: `url(#headerBg)`,
      }}
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
