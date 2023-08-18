import React, { useContext, useEffect, useState } from 'react'
import { createProdInRec, createReciept, fetchReciept } from '../http/API'
import { Context } from '../context/Context'

const ProductItem = ({ name, price, id, reload, reciepts }) => {
  const {
    productsInRec,
    currReciept,
    setCurrReciept,
    setReciepLoad,
    reciepLoad,
  } = useContext(Context)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (
      productsInRec.find((el) => el.productId === id) !== undefined &&
      productsInRec.length
    ) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [productsInRec])
  return (
    <div
      className={`product-list__item ${
        active ? 'product-list__item--active' : ''
      }`}
      onClick={async () => {
        if (currReciept === 0) {
          fetchReciept()
            .then((data) => {
              setCurrReciept(data.length + 1)
              setActive(true)
              return createReciept(data.length + 1, 0)
            })
            .then((data) => {
              createProdInRec(price, id, data.id)
              reload()
              setReciepLoad(!reciepLoad)
            })
        } else {
          await createProdInRec(price, id, reciepts[reciepts.length - 1].id)
          await setActive(true)
          await reload()
        }
      }}
    >
      <p>
        {id}. {name}
      </p>
      <p> price: {price} ₴</p>
    </div>
  )
}

export default ProductItem
