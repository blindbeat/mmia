import styles from "modules/projects/ProjectsTagButtons/ProjectsTagButtons.module.css"
import { ComponentPropsWithoutRef } from "react"

interface Props {
  tags: string[]
  tagSelector: (tag: string | null) => void
}

function ProjectsTagButtons({ tagSelector, tags }: Props) {
  return (
    <div className={styles.tags}>
      <Tag name="all" key="all" onClick={() => tagSelector(null)} />
      {tags.map((tagName) => (
        <Tag
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
