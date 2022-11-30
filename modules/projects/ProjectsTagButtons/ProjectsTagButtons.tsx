import styles from "./ProjectsTagButtons.module.css"
import { ComponentPropsWithoutRef } from "react"

interface Props {
  tags: string[]
  tagSelector: (tag: string | null) => void
}

const animationDelayBase = 0.7
const animationDelayDifference = 0.1

function ProjectsTagButtons({ tagSelector, tags }: Props) {
  return (
    <div className={styles.tags}>
      <Tag
        name="all"
        key="all"
        onClick={() => tagSelector(null)}
        style={{
          animationDelay: `${animationDelayBase}s`,
        }}
      />
      {tags.map((tagName, index) => (
        <Tag
          style={{
            animationDelay: `${
              animationDelayBase + (index + 1) * animationDelayDifference
            }s`,
          }}
          name={tagName}
          key={tagName}
          onClick={() => tagSelector(tagName)}
        />
      ))}
    </div>
  )
}

interface TagProps extends ComponentPropsWithoutRef<"button"> {
  name: string
}
function Tag({ name, ...rest }: TagProps) {
  return (
    <button className={styles.tag} {...rest}>
      {name}
      <span className={styles.amount}>(47)</span>
    </button>
  )
}

export default ProjectsTagButtons
