import React, { useContext, useEffect, useState } from 'react'
import { createProdInRec, fetchReciept } from '../http/API'
import { Context } from '../context/Context'

const ProductItem = ({ name, price, id, click, reload }) => {
  const { productsInRec } = useContext(Context)
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
      onClick={() => {
        fetchReciept().then((data) => {
          click(data.length + 1)
          createProdInRec(price, id, data[data.length - 1].id).then((data) =>
            reload(true)
          )
          setActive(true)
        })
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
