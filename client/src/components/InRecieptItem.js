import React, { useEffect, useState } from 'react'
import {
  deleteProdInRec,
  fetchOneProduct,
  updateQuantProdInRec,
} from '../http/API'

const InRecieptItem = ({ quantity, price, productId, reload }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    fetchOneProduct(productId).then((data) => setName(data.name))
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
            if (quantity === 1) {
              return deleteProdInRec(productId).then(() => reload())
            }
            updateQuantProdInRec(productId, quantity - 1)
            reload()
          }}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          className="increment"
          onClick={() => {
            updateQuantProdInRec(productId, quantity + 1)
            reload()
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
