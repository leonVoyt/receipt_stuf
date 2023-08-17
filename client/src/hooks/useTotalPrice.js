import { useMemo } from 'react'

export const useTotalPrice = (productsInRec) => {
  const memoData = useMemo(() => {
    const total = productsInRec.reduce((acc, curr) => {
      return curr.price * curr.quantity + acc
    }, 0)
    console.log('work')

    return total
  }, [productsInRec])

  return memoData
}
