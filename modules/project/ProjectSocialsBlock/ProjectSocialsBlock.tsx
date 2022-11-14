import styles from "modules/project/ProjectSocialsBlock/ProjectSocialsBlock.module.css"
import Link from "next/link"

interface Social {
  name: string
  link: string
}

const socials: Social[] = [
  { name: "instagram", link: "/" },
  { name: "behance", link: "/" },
  { name: "facebook", link: "/" },
  { name: "youtube", link: "/" },
]

export default function ProjectSocialsBlock() {
  return (
    <div className={styles.content}>
      <span className={styles.title}>Share project:</span>
      <div className={styles.socials}>
        {socials.map(({ name, link }) => (
          <Link key={name} href={link} className={styles.link}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}
