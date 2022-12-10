import { Gallery, ScreenTitle } from "components"
import styles from "./ProjectSchemasBlock.module.css"
import { NextImageSrc } from "misc/types"
import BackgroundSvg from "modules/home/AboutCompanyScreen/assets/backgroundLine.svg"
import { useAnimateLine } from "hooks"
import { dummyParagraph } from "assets/dummyText"

interface Props {
  schemas: NextImageSrc[]
}

export default function ProjectSchemasBlock({ schemas }: Props) {
  const { ref, style } = useAnimateLine()
  return (
    <div className={styles.content}>
      <ScreenTitle className={styles.blockTitle}>project drawing</ScreenTitle>
      <Gallery images={schemas} className={styles.photoWrapper} />
      <div className={styles.paragraphWrapper}>
        <p className={styles.paragraph}>{dummyParagraph}</p>
      </div>
      <BackgroundSvg ref={ref} style={style} className={styles.backgroundSvg} />
    </div>
  )
}
