import { CSSProperties } from "react"

export const usePopulateGridWithLines = (
  gridElementsAmount: number,
  columns: number
) => {
  const fullRowsAmount = Math.floor(gridElementsAmount / columns)
  const lastRowLength = gridElementsAmount % columns

  const rowsArray: number[] = []
  for (let i = 0; i <= fullRowsAmount; i++) {
    rowsArray.push(1 + i * 2)
  }

  const columnsParams: [number, number][] = []
  for (let i = 0; i < columns - 1; i++) {
    columnsParams.push([
      (i + 1) * 2,
      i < lastRowLength
        ? (fullRowsAmount + 1) * 2
        : (fullRowsAmount + 1) * 2 - 1,
    ])
  }

  const containerStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns - 1}, 1fr 1px) 1fr`,
  }

  return {
    rowsArray,
    columnsParams,
    containerStyle,
  }
}
