import classNames from "classnames"
import baseStyles from "modules/home/Home.module.css"
import styles from "./PapersScreen.module.css"
import Image from "next/image"
import backgroundImage from "./assets/background.jpg"
import Link from "components/Link"
import { useRef, useState } from "react"

const textHeading = "We improve the world around us and create an"
const textParagraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating "

const bubbleText = "AIMM is the team that implements "
const bubbleTextArr = new Array(3).fill(bubbleText)

const paperTitle = "AIMM is the team that implements"
const paperText =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating AIMM is the team that implements project ideas into reality. We see architecture as a unique product, "

const movePapers = (papersArr: number[]) => {
  const [firstPaper, ...rest] = papersArr
  return [...rest, firstPaper]
}

type AnimationName = "toLeft" | "toRight"

function PapersScreen() {
  const [papers, setPapers] = useState([1, 2, 3, 4])
  const [currentPaper, setCurrentPaper] = useState(0)
  const [flyingPapers, setFlyingPapers] = useState<[number, AnimationName][]>(
    []
  )
  const nextAnimationName = useRef<AnimationName>("toLeft")

  const changePage = (pageIndex: number) => {
    if (pageIndex === currentPaper) return
    const animationName = nextAnimationName.current
    setFlyingPapers((state) => [...state, [currentPaper, animationName]])
    nextAnimationName.current =
      nextAnimationName.current === "toLeft" ? "toRight" : "toLeft"
    setPapers(movePapers(papers))
    setCurrentPaper(pageIndex)
  }

  return (
    <div className={classNames(baseStyles.wrapper, styles.wrapper)}>
      <Image
        className={baseStyles.backgroundImage}
        src={backgroundImage}
        fill
        alt=""
      />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>{textHeading}</h2>
          <p>{textParagraph}</p>
          <Link lineColor="white" />
        </div>
        <div className={styles.bubblesWrapper}>
          {bubbleTextArr.map((text, index) => (
            <div
              key={index}
              className={styles.bubbleWrapper}
              onClick={() => changePage(index)}
            >
              <div key={index} className={styles.bubble}>
                <span className={styles.bubbleIndex}>{`0${index + 1}.`}</span>
                <span className={styles.bubbleText}>{text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.papersWrapper}>
          <div className={styles.papers}>
            {flyingPapers.length > 0 &&
              flyingPapers.map(([paper, animationName], index) => (
                <div
                  key={index}
                  className={classNames(
                    styles.paper,
                    styles.flyingPaper,
                    animationName === "toLeft"
                      ? styles.animateToLeft
                      : styles.animateToRight
                  )}
                  style={{
                    zIndex: papers.length + 1,
                  }}
                  // onAnimationEnd={() =>
                  //   setFlyingPapers((state) => state.slice(1))
                  // }
                >
                  <div className={styles.paperContentWrapper}>
                    <h3>{paperTitle}</h3>
                    {paperText}
                    <h3>{paper + 1}</h3>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.papers}>
            {papers.map((number, index) => (
              <div
                key={number}
                className={styles.paper}
                style={{
                  zIndex: papers.length - index,
                }}
              >
                <div className={styles.paperContentWrapper}>
                  {index === 0 && (
                    <>
                      <h3>{paperTitle}</h3>
                      {paperText}
                      <h3>{currentPaper + 1}</h3>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PapersScreen
