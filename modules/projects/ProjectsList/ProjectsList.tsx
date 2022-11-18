import styles from "./ProjectsList.module.css"
import Image from "next/image"
import TagList from "components/TagList/TagList"
import ProjectPreviewTitle from "components/ProjectPreviewTitle/ProjectPreviewTitle"
import { ProjectBrief } from "misc/types"
import Link from "next/link"
import classNames from "classnames"
import { AnimationEventHandler, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import ImageZoomableContainer from "components/ImageZoomableContainer"

interface Props {
  projects: ProjectBrief[]
}

export default function ProjectsList({ projects }: Props) {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0)
  const [immediateAnimationsEnded, setImmediateAnimationsEnded] =
    useState(false)
  return (
    <div className={styles.content}>
      {projects.map((project, index) => (
        <Project
          project={project}
          key={index}
          index={index}
          lastVisibleIndex={lastVisibleIndex}
          lastVisibleIndexSetter={setLastVisibleIndex}
          ImmediateAnimationsEndedSetter={setImmediateAnimationsEnded}
          immediateAnimationsEnded={immediateAnimationsEnded}
        />
      ))}
    </div>
  )
}

interface ProjectProps {
  project: ProjectBrief
  index: number
  lastVisibleIndex: number
  lastVisibleIndexSetter: (index: number) => void
  ImmediateAnimationsEndedSetter: (value: boolean) => void
  immediateAnimationsEnded: boolean
}

const imageSizes = `(max-width: 1024px) 100vw,
                      50vw`

const baseDelay = 1.6
function Project({
  project: { title, image, tags },
  index,
  lastVisibleIndex,
  lastVisibleIndexSetter,
  ImmediateAnimationsEndedSetter,
  immediateAnimationsEnded,
}: ProjectProps) {
  const { pathname } = useRouter()
  const [requiresTriggering, setRequiresTriggering] = useState<boolean>(false)
  const [isTriggered, setIsTriggered] = useState<boolean>(false)
  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const elem = ref.current
    if (!elem) return
    const rect = elem.getBoundingClientRect()
    if (rect.top >= window.innerHeight + rect.height * 0.125) {
      setRequiresTriggering(true)
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setIsTriggered(true)
      })
      observer.observe(elem)
      return () => observer.unobserve(elem)
    } else {
      if (index > lastVisibleIndex) lastVisibleIndexSetter(index)
    }
  }, [index, lastVisibleIndex, lastVisibleIndexSetter])

  const handleEndAnimation: AnimationEventHandler<HTMLAnchorElement> = (e) => {
    if (index === lastVisibleIndex && e.animationName.includes("appear")) {
      ImmediateAnimationsEndedSetter(true)
    }
  }

  const delayDifference = lastVisibleIndex > 7 ? 0.05 : 0.2

  return (
    <Link
      ref={ref}
      href={`${pathname}/projectName`}
      style={{
        animationPlayState: requiresTriggering
          ? isTriggered && immediateAnimationsEnded
            ? "running"
            : "paused"
          : undefined,
        animationDelay: !requiresTriggering
          ? `${baseDelay + index * delayDifference}s`
          : undefined,
      }}
      onAnimationEnd={handleEndAnimation}
      className={classNames(styles.project)}
    >
      <ImageZoomableContainer className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          sizes={imageSizes}
          className={styles.image}
        />
      </ImageZoomableContainer>
      <ProjectPreviewTitle title={title} className={styles.title} />
      <TagList tags={tags} className={styles.tags} />
    </Link>
  )
}
