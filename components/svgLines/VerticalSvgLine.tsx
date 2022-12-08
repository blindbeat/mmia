import styles from "./SvgLine.module.css"

interface Props {
  column: number
  rowsAmount: number
}
export const VerticalSvgLine = ({ column, rowsAmount }: Props) => {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 1 100"
      style={{
        gridRow: `1 / span ${rowsAmount}`,
        gridColumn: column,
      }}
      className={styles.verticalSvg}
    >
      <line
        vectorEffect="non-scaling-stroke"
        x={0}
        y={0}
        x2={0}
        y2={100}
        strokeWidth={1}
        stroke="rgb(200,200,200)"
      ></line>
    </svg>
  )
}
