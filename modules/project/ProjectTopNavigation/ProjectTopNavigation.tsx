import Link from "next/link"
import styles from "./ProjectTopNavigation.module.css"
import ArrowRight from "./assets/ArrowRight.svg"
import classNames from "classnames"

interface Props {
  nextLink: string
}
export default function ProjectTopNavigation({ nextLink }: Props) {
  return (
    <div className={styles.content}>
      <Link href="/projects" className={styles.link}>
        <ArrowRight className={classNames(styles.arrow, styles.arrowLeft)} />
        back to projects
      </Link>
      <Link
        href={`/projects/${nextLink}`}
        className={classNames(styles.link, styles.nextProject)}
      >
        view next project
        <ArrowRight className={styles.arrow} />
      </Link>
    </div>
  )
}
