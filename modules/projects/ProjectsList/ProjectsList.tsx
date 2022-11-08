import styles from "./ProjectsList.module.css"
import Image from "next/image"
import TagList from "components/TagList/TagList"
import ProjectPreviewTitle from "components/ProjectPreviewTitle/ProjectPreviewTitle"
import { ProjectBrief } from "misc/types"
import Link from "next/link"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"

interface Props {
  projects: ProjectBrief[]
}

export default function ProjectsList({ projects }: Props) {
  return (
    <div className={styles.content}>
      {projects.map((project, index) => (
        <Project project={project} key={index} />
      ))}
    </div>
  )
}

interface ProjectProps {
  project: ProjectBrief
}

function Project({ project: { title, image, tags } }: ProjectProps) {
  const [requiresAnimation, setRequiresAnimation] = useState<boolean>(false)
  const [isTriggered, setIsTriggered] = useState<boolean>(false)

  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const elem = ref.current
    if (!elem) return
    const rect = elem.getBoundingClientRect()
    if (rect.top >= window.innerHeight) {
      setRequiresAnimation(true)
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setIsTriggered(true)
      })
      observer.observe(elem)
      return () => observer.unobserve(elem)
    }
  }, [])

  return (
    <Link
      ref={ref}
      href={title}
      style={{
        animationPlayState: isTriggered ? "running" : "paused",
      }}
      className={classNames(
        styles.project,
        requiresAnimation && styles.requiresAnimation
      )}
    >
      <Image src={image as unknown as any} alt={title} />
      <ProjectPreviewTitle title={title} className={styles.title} />
      <TagList tags={tags} className={styles.tags} />
    </Link>
  )
}
