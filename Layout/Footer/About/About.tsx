import styles from "./About.module.css"
import LinkWithLine from "components/LinkWithLine"
import Link from "next/link"

const ctaText = "Let’s talk about  your project!"

const links = ["services", "projects", "media", "career", "contact"]
const email = "info@aimm-group.com"
const number = "+38 (044) 228 91 59"

function About() {
  return (
    <div className={styles.content}>
      <div className={styles.cta}>
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
        <span className={styles.blockTitle}>pages</span>
        <Link key={email} href={`mailto:${email}`}>
          {email}
        </Link>
        <Link key={number} href="tel:+380442289159">
          {number}
        </Link>
      </div>
      <div className={styles.copyright}>
        aimm © copyright 2020. <span>all rights reserved</span>
      </div>
      <div className={styles.policies}>
        <Link href="#">privacy policy</Link>
        <Link href="#">terms of use</Link>
      </div>
      <div className={styles.developedBy}>
        <span>developed by</span> <Link href="#">black fire</Link>
      </div>
    </div>
  )
}

export default About