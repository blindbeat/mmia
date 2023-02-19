import styles from "./FooterAbout.module.css"
import utilStyles from "styles/utils.module.css"
import { ComponentWithLineAdornment, Heading } from "components"
import Link from "next/link"
import classNames from "classnames"
import BackgroundSvg from "./assets/backgroundLine.svg"
import { useAnimateLine, useCalcElementHeight } from "hooks"
import { useContext, useEffect } from "react"
import { FooterHeightContext } from "contexts"
import { useStaticDataSWR } from "hooks/useStaticDataSWR"

const links = ["projects", "media", "building", "contact"]
const email = "info@aimm-group.com"
const number = "+38 (044) 228 91 59"

const FooterAbout = () => {
  const { ref: bgRef, style: bgStyle } = useAnimateLine()
  const { ref, height } = useCalcElementHeight()
  const footerHeightContext = useContext(FooterHeightContext)
  const data = useStaticDataSWR()
  useEffect(() => {
    footerHeightContext?.(height)
  }, [footerHeightContext, height, data])

  return (
    <div ref={ref} className={classNames(styles.content, utilStyles.wrapper)}>
      <div className={styles.ctaBlock}>
        <Heading as="h3">{data?.block2_description || ""}</Heading>
        <ComponentWithLineAdornment as="button" color="black">
          drop request
        </ComponentWithLineAdornment>
      </div>
      <div className={styles.pages}>
        <span className={styles.blockTitle}>pages</span>
        {links.map((link) => (
          <Link key={link} href={link}>
            {link}
          </Link>
        ))}
      </div>
      <div className={styles.contacts}>
        <span className={styles.blockTitle}>contacts</span>
        <Link key={email} href={`mailto:${email}`}>
          {email}
        </Link>
        <Link key={number} href="tel:+380442289159">
          {number}
        </Link>
      </div>
      <div className={styles.copyright}>
        <span>aimm © copyright 2020.</span>{" "}
        <span className={styles.textWithOpacity}>all rights reserved</span>
      </div>
      <div className={styles.policies}>
        <Link href="">privacy policy</Link>
        <Link href="">terms of use</Link>
      </div>
      <div className={styles.developedBy}>
        <span className={styles.textWithOpacity}>developed by</span>{" "}
        <Link href="">black fire</Link>
      </div>
      <BackgroundSvg
        ref={bgRef}
        style={bgStyle}
        className={styles.backgroundSvg}
      />
    </div>
  )
}

export default FooterAbout
