import styles from "modules/project/ProjectSocialsBlock/ProjectSocialsBlock.module.css"
import Link from "next/link"
import { useThresholdObserver } from "hooks"

interface Social {
  name: string
  nameShort: string
  link: string
}

const socials: Social[] = [
  { name: "instagram", nameShort: "in", link: "/" },
  { name: "behance", nameShort: "be", link: "/" },
  { name: "facebook", nameShort: "fb", link: "/" },
  { name: "youtube", nameShort: "yt", link: "/" },
]

export default function ProjectSocialsBlock() {
  const extendsThreshold = useThresholdObserver(768)
  return (
    <div className={styles.content}>
      <span className={styles.title}>Share project:</span>
      <div className={styles.socials}>
        {socials.map(({ name, nameShort, link }) => (
          <Link key={name} href={link} className={styles.link}>
            {extendsThreshold ? name : nameShort}
          </Link>
        ))}
      </div>
    </div>
  )
}
