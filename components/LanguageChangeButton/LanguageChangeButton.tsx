import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef } from "react"

function LanguageChangeButton({
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & Omit<LinkProps, "href">) {
  return (
    <Link className={className} href="#" {...rest}>
      en
    </Link>
  )
}

export default LanguageChangeButton
