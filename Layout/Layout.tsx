import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

export interface LayoutConfig {
  adaptiveHeaderTransparency: boolean
}

interface Props {
  children: ReactNode
  config?: LayoutConfig
}

const defaultConfig: LayoutConfig = {
  adaptiveHeaderTransparency: true,
}

function Layout({ children, config = defaultConfig }: Props) {
  return (
    <div>
      <Header adaptiveTransparency={config?.adaptiveHeaderTransparency} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
