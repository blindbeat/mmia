import Link from "next/link"
import styles from "./ProjectTopNavigation.module.css"
import ArrowRight from "./assets/ArrowRight.svg"
import classNames from "classnames"
import { useTranslation } from "next-i18next"

interface Props {
  nextLink: string
}
export default function ProjectTopNavigation({ nextLink }: Props) {
  const { t } = useTranslation(["project"])

  return (
    <div className={styles.content}>
      <Link href="/projects" className={styles.link}>
        <ArrowRight className={classNames(styles.arrow, styles.arrowLeft)} />
        {t("back")}
      </Link>
      <Link
        href={`/projects/${nextLink}`}
        className={classNames(styles.link, styles.nextProject)}
      >
        {t("next")}
        <ArrowRight className={styles.arrow} />
      </Link>
    </div>
  )
}
