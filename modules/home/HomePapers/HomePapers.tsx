import classNames from "classnames"
import utilStyles from "styles/utils.module.css"
import styles from "./HomePapers.module.css"
import Image from "next/image"
import { Bubble, ComponentWithLineAdornment, Heading } from "components"
import { useRef, useState } from "react"
import { useThresholdObserver } from "hooks"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { generatePreparationIndex } from "modules/building/BuildingPreparation/BuildingPreparation"
import { HomeBuildingContent } from "types"
import { useTranslation } from "next-i18next"

const movePapers = (papersArr: number[]) => {
  const [firstPaper, ...rest] = papersArr
  return [...rest, firstPaper]
}

type AnimationName = "toLeft" | "toRight"

const HomePapers = ({
  title,
  description,
  image,
  content,
}: HomeBuildingContent) => {
  const [papers, setPapers] = useState([1, 2, 3])
  const [currentPaper, setCurrentPaper] = useState(0)
  const [flyingPapers, setFlyingPapers] = useState<[number, AnimationName][]>(
    []
  )
  const nextAnimationName = useRef<AnimationName>("toLeft")
  const { t } = useTranslation(["home", "common"])

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
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
          <ComponentWithLineAdornment
            href="building"
            color="white"
            className={styles.link}
          >
            {t("view more", { ns: "common" })}
          </ComponentWithLineAdornment>
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
                    <h5 className={styles.paperContentTitle}>
                      {content[paper].title}
                    </h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content[paper].description,
                      }}
                      className={styles.pageContentText}
                    />
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
                      <h5 className={styles.paperContentTitle}>
                        {content[currentPaper].title}
                      </h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content[currentPaper].description,
                        }}
                        className={styles.pageContentText}
                      />
                      <ComponentWithLineAdornment
                        color="black"
                        href={`building#${generatePreparationIndex(index + 1)}`}
                        className={styles.paperContentLink}
                      >
                        {t("view more", { ns: "common" })}
                      </ComponentWithLineAdornment>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {extendsThreshold ? (
          <div className={styles.bubblesWrapper}>
            {content.map(({ title }, index) => (
              <Bubble
                key={index}
                index={index}
                className={index === currentPaper ? "active-bubble" : undefined}
                onClick={() => changePage(index)}
                variant="papers"
                withIndex
              >
                <p className={styles.bubbleText}>{title}</p>
              </Bubble>
            ))}
          </div>
        ) : (
          <Swiper slidesPerView={1.75} centeredSlides className={styles.swiper}>
            {content.map(({ title }, index) => (
              <SwiperSlide key={index}>
                <Link href={`building#${generatePreparationIndex(index + 1)}`}>
                  <Bubble index={index} variant="papers" withIndex>
                    {title}
                  </Bubble>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Image
        className={utilStyles.backgroundImage}
        src={image.src}
        fill
        alt=""
      />
    </div>
  )
}

export default HomePapers
