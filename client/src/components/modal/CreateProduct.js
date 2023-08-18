import React, { useState } from 'react'
import { createProduct, deleteProduct, fetchProducts } from '../../http/API'

const CreateProductModal = ({
  vision,
  type,
  reload,
  products,
  setProducts,
  setVision,
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const createPr = (name, price) => {
    createProduct(name, price).then((data) =>
      fetchProducts().then((data) => setProducts(data))
    )
    setVision(!vision)
  }
  const deletePr = (id) => {
    deleteProduct(id).then(() =>
      fetchProducts().then((data) => setProducts(data))
    )
    setVision(!vision)
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
          value={name}
          placeholder={type === 'delete' ? 'id' : 'name'}
          onChange={(e) => setName(e.target.value)}
        />
        {type !== 'delete' ? (
          <input
            type="text"
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          ''
        )}
        {type === 'delete' ? (
          <button
            onClick={() => {
              deletePr(name)
              reload()
              setName('')
            }}
          >
            Delete from list
          </button>
        ) : (
          <button
            onClick={() => {
              createPr(name, price)
              reload()
              setName('')
              setPrice('')
            }}
          >
            Add to list
          </button>
        )}
      </div>
    </div>
  )
}

export default CreateProductModal
