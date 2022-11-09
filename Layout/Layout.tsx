import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Layout.module.css"

export interface LayoutConfig {
  adaptiveHeaderTransparency: boolean
  showFooter: boolean
}

interface Props {
  children: ReactNode
  config?: Partial<LayoutConfig>
}

function Layout({
  children,
  config: { showFooter = true, adaptiveHeaderTransparency = true } = {},
}: Props) {
  return (
    <>
      <Header adaptiveTransparency={adaptiveHeaderTransparency} />
      <main className={styles.content}>{children}</main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
