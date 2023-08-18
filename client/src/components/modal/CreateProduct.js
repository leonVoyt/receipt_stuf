import React, { useState } from 'react'
import { createProduct, deleteProduct } from '../../http/API'

const CreateProductModal = ({ vision, type }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const createPr = (name, price) => {
    createProduct(name, price)
  }
  const deletePr = (id) => {
    deleteProduct(id)
  }
  return (
    <div className={`modal-product ${vision ? 'modal-product--active' : ''}`}>
      <div
        className="modal-product--inputs"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{type === 'delete' ? 'Delete' : 'Add'} product</h1>
        <input
          type="text"
          placeholder={type === 'delete' ? 'id' : 'name'}
          onChange={(e) => setName(e.target.value)}
        />
        {type !== 'delete' ? (
          <input
            type="text"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          ''
        )}
        {type === 'delete' ? (
          <button onClick={() => deletePr(name)}>Delete from list</button>
        ) : (
          <button onClick={() => createPr(name, price)}>Add to list</button>
        )}
      </div>
    </div>
  )
}

export default CreateProductModal
