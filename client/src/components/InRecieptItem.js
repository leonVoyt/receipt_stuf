import React, { useEffect, useState } from 'react'
import { deleteProdInRec, updateQuantProdInRec } from '../http/API'

const InRecieptItem = ({ quantity, price, productId, reload, products }) => {
  const [name, setName] = useState('')

  const increment = () => {
    updateQuantProdInRec(productId, quantity + 1).finally(() => reload())
  }

  const decrement = () => {
    if (quantity === 1) {
      return deleteProdInRec(productId).then(() => reload())
    }
    updateQuantProdInRec(productId, quantity - 1).finally(() => reload())
  }

  useEffect(() => {
    if (products.length !== 0) {
      setName(products.find((el) => el.id === productId).name)
    }
  }, [])
  return (
    <div className="in-reciept-list__item">
      <div className="in-reciept-list__item--name">
        {productId}. {name}
      </div>
      <div className="in-reciept-list__item--quantity">
        <button
          className="decrement"
          onClick={() => {
            decrement()
          }}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          className="increment"
          onClick={() => {
            increment()
          }}
        >
          +
        </button>
      </div>
      <div className="in-reciept-list__item--price">
        <p> price: {price * quantity} ₴</p>
        <button
          className="button-delete--in-reciept"
          onClick={() => {
            deleteProdInRec(productId).then(() => reload())
          }}
        >
          X
        </button>
      </div>
    </div>
  )
}

export default InRecieptItem
