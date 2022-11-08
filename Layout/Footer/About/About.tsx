import styles from "./About.module.css"
import utilStyles from "styles/utils.module.css"
import LinkWithLine from "components/LinkWithLine"
import Link from "next/link"
import classNames from "classnames"
import BackgroundSvg from "./assets/backgroundLine.svg"
import useAnimateLine from "hooks/useAnimateLine"

const ctaText = "Let’s talk about  your project!"

const links = ["services", "projects", "media", "career", "contact"]
const email = "info@aimm-group.com"
const number = "+38 (044) 228 91 59"

function About() {
  const { ref: bgRef, style: bgStyle } = useAnimateLine()

  return (
    <div className={classNames(styles.content, utilStyles.wrapper)}>
      <div className={styles.ctaBlock}>
        <h2>{ctaText}</h2>
        <LinkWithLine color="black">drop request</LinkWithLine>
      </div>
      <div className={styles.pages}>
        <span className={styles.blockTitle}>pages</span>
        {links.map((link) => (
          <Link key={link} href="#">
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
        <Link href="#">privacy policy</Link>
        <Link href="#">terms of use</Link>
      </div>
      <div className={styles.developedBy}>
        <span className={styles.textWithOpacity}>developed by</span>{" "}
        <Link href="#">black fire</Link>
      </div>
      <BackgroundSvg
        ref={bgRef}
        style={bgStyle}
        className={styles.backgroundSvg}
      />
    </div>
  )
}

export default About
