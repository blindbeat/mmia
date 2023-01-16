import styles from "./ProjectsTagButtons.module.css"
import { ComponentPropsWithoutRef } from "react"
import { TagWithCount } from "misc/types"

interface Props {
  tags: TagWithCount[]
  tagSelector: (tag: number | null) => void
}

const animationDelayBase = 0.7
const animationDelayDifference = 0.1

function ProjectsTagButtons({ tagSelector, tags }: Props) {
  const allProjectsCount = tags.reduce(
    (acc, current) => acc + current.projects_count,
    0
  )
  return (
    <div className={styles.tags}>
      <Tag
        name="all"
        amount={allProjectsCount}
        key="all"
        onClick={() => tagSelector(null)}
        style={{
          animationDelay: `${animationDelayBase}s`,
        }}
      />
      {tags.map((tag, index) => (
        <Tag
          style={{
            animationDelay: `${
              animationDelayBase + (index + 1) * animationDelayDifference
            }s`,
          }}
          name={tag.name}
          amount={tag.projects_count}
          key={tag.id}
          onClick={() => tagSelector(tag.id)}
        />
      ))}
    </div>
  )
}

interface TagProps extends ComponentPropsWithoutRef<"button"> {
  name: string
  amount: number
}
function Tag({ name, amount, ...rest }: TagProps) {
  return (
    <button className={styles.tag} {...rest}>
      {name}
      <span className={styles.amount}>({amount})</span>
    </button>
  )
}

export default ProjectsTagButtons
