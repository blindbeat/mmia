import classNames from "classnames"
import utilStyles from "styles/utils.module.css"
import styles from "./HomePapers.module.css"
import Image from "next/image"
import backgroundImage from "assets/dummyPics/home/homePapers/scaffolding.jpg"
import { Bubble, Heading, LinkWithLine, Paragraph } from "components"
import { useRef, useState } from "react"
import { useThresholdObserver } from "hooks"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  dummyParagraph,
  dummyParagraphLong2,
  dummyParagraphShort,
} from "assets/dummyText"

const textHeading = "We improve the world around us and create an"

const bubbleTextArr = new Array(3).fill(dummyParagraphShort)

const movePapers = (papersArr: number[]) => {
  const [firstPaper, ...rest] = papersArr
  return [...rest, firstPaper]
}

type AnimationName = "toLeft" | "toRight"

const HomePapers = () => {
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
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.content}>
        <div className={styles.text}>
          <Heading as="h3">{textHeading}</Heading>
          <Paragraph>{dummyParagraph}</Paragraph>
          <LinkWithLine color="white" className={styles.link}>
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
                    <h5>{dummyParagraphShort}</h5>
                    {dummyParagraphLong2}
                    <h5>{paper + 1}</h5>
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
                      <h5>{dummyParagraphShort}</h5>
                      {dummyParagraphLong2}
                      <h5>{currentPaper + 1}</h5>
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
                variant="papers"
                withIndex
              >
                <p className={styles.bubbleText}>{text}</p>
              </Bubble>
            ))}
          </div>
        ) : (
          <Swiper slidesPerView={1.75} centeredSlides className={styles.swiper}>
            {bubbleTextArr.map((text, index) => (
              <SwiperSlide key={index}>
                <Bubble index={index} variant="papers" withIndex>
                  {text}
                </Bubble>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Image
        className={utilStyles.backgroundImage}
        src={backgroundImage}
        fill
        alt=""
      />
    </div>
  )
}

export default HomePapers