import React from "react"

type Props<C extends React.ElementType> = {
  as?: C
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<C>

export const Test = <C extends React.ElementType>({
  as,
  children,
  ...restProps // 👈 look here
}: Props<C>) => {
  const Component = as || "div"

  // see restProps passed 👇
  return <Component {...restProps}>{children}</Component>
}
