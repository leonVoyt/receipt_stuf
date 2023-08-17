import { useMemo } from 'react'

export const useTotalPrice = (productsInRec) => {
  const memoData = useMemo(() => {
    const total = productsInRec.reduce((acc, curr) => {
      return curr.price * curr.quantity + acc
    }, 0)

    return total
  }, [productsInRec])

  return memoData
}
