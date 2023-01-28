import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { useRouter } from "next/router"

export const LanguageChangeButton = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & Omit<LinkProps, "href">) => {
  const router = useRouter()
  const destinationLocale = router.locale === "uk" ? "en" : "uk"
  return (
    <Link
      className={className}
      locale={destinationLocale}
      href={router.pathname}
      {...rest}
    >
      {destinationLocale}
    </Link>
  )
}
