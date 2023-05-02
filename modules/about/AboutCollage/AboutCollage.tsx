import styles from "./AboutCollage.module.css"
import { Paragraph } from "components"
import Image from "next/image"
import { motion } from "framer-motion"
import { ImageWithDimensions } from "types"
import { useTranslation } from "next-i18next"

const founderImageSizes = `
                   (max-width: calc(48em - 1px)) 100vw,
                   (max-width: calc(64em - 1px)) 50vw,
                   700px,
                   `

const officeImageSizes = `
                         (max-width: calc(64em - 1px)) 30vw,
                         550px,
                         `
interface Props {
  text: string
  founderPhoto: ImageWithDimensions
  officePhoto: ImageWithDimensions
}
const AboutCollage = ({ text, founderPhoto, officePhoto }: Props) => {
  const { t } = useTranslation(["about"])

  return (
    <div className={styles.content}>
      <Paragraph className={styles.text}>{text}</Paragraph>
      <Image
        src={founderPhoto}
        alt=""
        sizes={founderImageSizes}
        className={styles.founderImage}
      />
      <div className={styles.office}>
        <span className={styles.officeTitle}>{t("office title")}</span>
        <Image
          src={officePhoto}
          alt=""
          sizes={officeImageSizes}
          className={styles.officeImage}
        />
      </div>
      <div className={styles.backgroundSvgWrapper}>
        <svg
          viewBox="0 0 1920 1968"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.backgroundSvg}
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
            }}
            opacity="0.1"
            d="M-142.525 519.497C139.237 335.288 555.832 1113.02 794.258 1547.56C1007.4 1953.53 864.952 2134.47 356.474 1768.93C-772.956 893.378 1825.4 1585.15 1775.54 644.572C1725.69 -296.002 2388.1 612.986 1681.94 403.666C1552.87 365.407 1463.59 311.495 1414.52 186.134C1347.81 15.6954 1579.79 -252.435 1579.79 -252.435"
            stroke="black"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

export default AboutCollage
