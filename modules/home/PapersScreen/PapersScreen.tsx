import classNames from "classnames"
import baseStyles from "modules/home/Home.module.css"
import styles from "./PapersScreen.module.css"
import Image from "next/image"
import backgroundImage from "assets/dummyPics/backgrounds/scaffolding.jpg"
import LinkWithLine from "components/LinkWithLine"
import { useRef, useState } from "react"
import Bubble from "./Bubble"
import H2 from "components/H2"
import P from "components/P"
import useThresholdObserver from "hooks/useThresholdObserver"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"

const textHeading = "We improve the world around us and create an"
const textParagraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating "

const bubbleText = "AIMM is the team that implements"
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

  const extendsThreshold = useThresholdObserver(768)
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
      <div className={styles.content}>
        <div className={styles.text}>
          <H2>{textHeading}</H2>
          <P>{textParagraph}</P>
          <LinkWithLine color="white" wrapperClassName={styles.link}>
            view more
          </LinkWithLine>
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
        {extendsThreshold ? (
          <div className={styles.bubblesWrapper}>
            {bubbleTextArr.map((text, index) => (
              <Bubble
                key={index}
                index={index}
                className={index === currentPaper ? "active-bubble" : undefined}
                onClick={() => changePage(index)}
              >
                {text}
              </Bubble>
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView={1.75}
            centeredSlides
            modules={[FreeMode]}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            className={styles.swiper}
          >
            {bubbleTextArr.map((text, index) => (
              <SwiperSlide key={index}>
                <Bubble index={index}>{text}</Bubble>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Image
        className={baseStyles.backgroundImage}
        src={backgroundImage}
        fill
        alt=""
      />
    </div>
  )
}

export default PapersScreen
