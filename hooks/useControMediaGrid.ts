import { CSSProperties } from "react"

type ColumnParams = [
  columnNumber: number,
  columnHeight: number,
  columnProgress: number
]
export const useControMediaGrid = (
  gridElementsAmount: number,
  lastVisibleCardIndex: number,
  columns: null | number
) => {
  let isPrerender = false
  if (columns === null) {
    columns = 1
    isPrerender = true
  }
  const fullRowsAmount = Math.floor(gridElementsAmount / columns)
  const lastRowLength = gridElementsAmount % columns

  const rowsArray: number[] = []
  for (let i = 0; i <= fullRowsAmount; i++) {
    rowsArray.push(1 + i * 2)
  }

  const lastVisibleRow = Math.ceil(
    lastVisibleCardIndex > 0 ? (lastVisibleCardIndex + 1) / columns : 0
  )

  const calcColumnParams = (i: number): ColumnParams => {
    const columnNumber = (i + 1) * 2
    const columnHeight =
      i < lastRowLength
        ? (fullRowsAmount + 1) * 2
        : (fullRowsAmount + 1) * 2 - 1
    const columnHeightWithoutRowLines =
      i < lastRowLength ? fullRowsAmount + 1 : fullRowsAmount
    const columnProgress = Math.min(
      lastVisibleRow / columnHeightWithoutRowLines,
      1
    )
    return [columnNumber, columnHeight, columnProgress]
  }

  const columnsParams: ColumnParams[] = []
  for (let i = 0; i < columns - 1; i++) {
    columnsParams.push(calcColumnParams(i))
  }
  console.log(isPrerender)
  const containerStyle: CSSProperties = {
    gridTemplateColumns:
      columns > 1 ? `repeat(${columns - 1}, 1fr 1px) 1fr` : `1fr`,
    visibility: isPrerender ? "hidden" : "unset",
  }

  return {
    rowsArray,
    columnsParams,
    containerStyle,
  }
}
