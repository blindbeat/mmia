import styles from "./ProjectsList.module.css"
import Image from "next/image"
import {
  ImageZoomableContainer,
  ProjectPreviewTitle,
  TagList,
} from "components"
import { ProjectBrief } from "types"
import Link from "next/link"
import classNames from "classnames"
import { AnimationEventHandler, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

interface Props {
  projects: ProjectBrief[]
  withDelay: boolean
}

export default function ProjectsList({ projects, withDelay }: Props) {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0)
  const [immediateAnimationsEnded, setImmediateAnimationsEnded] =
    useState(false)
  return (
    <div className={styles.content}>
      {projects.map((project, index) => (
        <Project
          project={project}
          key={project.id}
          index={index}
          withDelay={withDelay}
          lastVisibleIndex={lastVisibleIndex}
          lastVisibleIndexSetter={setLastVisibleIndex}
          immediateAnimationsEnded={immediateAnimationsEnded}
          ImmediateAnimationsEndedSetter={setImmediateAnimationsEnded}
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
  immediateAnimationsEnded: boolean
  ImmediateAnimationsEndedSetter: (value: boolean) => void
  withDelay: boolean
}

const imageSizes = `(max-width: 1024px) 100vw,
                      50vw`

const baseDelay = 1.3
function Project({
  project: { heading, image, categories: tags, slug },
  index,
  lastVisibleIndex,
  lastVisibleIndexSetter,
  immediateAnimationsEnded,
  ImmediateAnimationsEndedSetter,
  withDelay,
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
      href={`${pathname}/${slug}`}
      style={{
        animationPlayState: requiresTriggering
          ? isTriggered && immediateAnimationsEnded
            ? "running"
            : "paused"
          : undefined,
        animationDelay: !requiresTriggering
          ? `${baseDelay * Number(withDelay) + index * delayDifference}s`
          : undefined,
      }}
      onAnimationEnd={handleEndAnimation}
      className={classNames(styles.project)}
    >
      <ImageZoomableContainer className={styles.imageContainer}>
        <Image
          src={image}
          fill
          alt={heading}
          sizes={imageSizes}
          className={styles.image}
        />
      </ImageZoomableContainer>
      <ProjectPreviewTitle className={styles.title}>
        {heading}
      </ProjectPreviewTitle>
      <TagList tags={tags} className={styles.tags} />
    </Link>
  )
}
