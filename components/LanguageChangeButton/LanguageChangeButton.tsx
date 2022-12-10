import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef } from "react"

export const LanguageChangeButton = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & Omit<LinkProps, "href">) => {
  return (
    <Link className={className} href="#" {...rest}>
      en
    </Link>
  )
}
