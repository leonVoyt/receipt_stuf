import React, { useState } from 'react'
import { createProduct } from '../http/API'

const CreateProductModal = ({ vision }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const createPr = (name, price) => {
    createProduct(name, price)
  }
  return (
    <div className={`modal-product ${vision ? 'modal-product--active' : ''}`}>
      <div
        className="modal-product--inputs"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Add product</h1>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={() => createPr(name, price)}>Add to list</button>
      </div>
    </div>
  )
}

export default CreateProductModal
