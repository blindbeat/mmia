import styles from "./Info.module.css"
import { InfoData } from "types"

const Info = ({ title, description, blocks }: InfoData) => {
  return (
    <>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.paragraph}>{description}</p>
      {blocks.map(({ name, description }, index) => (
        <InfoBlock key={index} name={name} description={description} />
      ))}
    </>
  )
}

interface InfoBlockProps {
  name: string
  description: string
}
const InfoBlock = ({ name, description }: InfoBlockProps) => {
  return (
    <div className={styles.block}>
      <h5 className={styles.title}>{name}</h5>
      <p>{description}</p>
    </div>
  )
}

export default Info
