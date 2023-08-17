import React, { useEffect, useState } from 'react'
import './App.css'
import {
  closeReciept,
  createReciept,
  deleteAll,
  deleteProdInRec,
  deleteProduct,
  fetchProdInRec,
  fetchProducts,
  fetchReciept,
} from './http/API'
import ProductItem from './components/ProductItem'
import CreateProductModal from './modal/CreateProduct'
import InRecieptItem from './components/InRecieptItem'
import { Context } from './context/Context'
import { useTotalPrice } from './hooks/useTotalPrice'
import { useDate } from './hooks/useDate'

const App = () => {
  const [products, setProducts] = useState([])
  const [productsInRec, setProductsInRec] = useState([])
  const [vision, setVision] = useState(false)
  const [currReciept, setCurrReciept] = useState(0)
  const [currRecieptId, setCurrRecieptId] = useState(0)
  const [reload, setReload] = useState(false)
  const [active, setActive] = useState(false)
  const total = useTotalPrice(productsInRec)
  const currDate = useDate()
  console.log(currRecieptId)

  const closeRecieptHandler = (number, date, total) => {
    closeReciept(number, date, total)
  }
  const deletePr = () => {
    deleteProduct(22)
  }
  const clickHandler = (number, total = 0) => {
    if (currReciept === 0) {
      createReciept(number, total).then((data) => {
        setCurrReciept(data.number)
      })
    }
  }
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
    })
    fetchReciept().then((data) => {
      setCurrRecieptId(data[data.length - 1].id)
      if (data[data.length - 1].date === null) {
        return data.length && setCurrReciept(data[data.length - 1].number)
      }
      return 0
    })
    fetchProdInRec().then((data) => {
      setProductsInRec(data)
    })
    setReload(false)
    function handleClick() {
      setVision(false)
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [reload])
  return (
    <Context.Provider value={{ total, productsInRec }}>
      <div className="main">
        <CreateProductModal vision={vision} />
        <div className="left">
          <div className="search">
            <input type="text" className="search__input" />
            <div className="search__line"></div>
          </div>
          <div className="button">
            <button
              className="button__create"
              onClick={(e) => {
                setVision(true)
                console.log(vision)
                e.stopPropagation()
              }}
            >
              add product
            </button>
            <button
              className="button__delete"
              onClick={(e) => {
                deletePr(22)
              }}
            >
              delete product
            </button>
          </div>
          <div className="product-list">
            <h1>Menu</h1>
            {products.length &&
              products.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  click={clickHandler}
                  reload={setReload}
                ></ProductItem>
              ))}
          </div>
        </div>
        <div className="right">
          <div className="topBar">
            <div className="recieptName">
              <h2>Check #{currReciept !== 0 ? currReciept : ''}</h2>
            </div>
            <div className="quantity">
              <h2>quantity</h2>
            </div>
            <div className="price">
              <h2>price</h2>
            </div>
          </div>
          <div className="reciepts__list">
            {productsInRec.length &&
              productsInRec
                .sort(function (a, b) {
                  if (a.createdAt > b.createdAt) {
                    return 1
                  }
                  if (a.createdAt < b.createdAt) {
                    return -1
                  }
                  // a должно быть равным b
                  return 0
                })
                .map((el, index) => (
                  <InRecieptItem
                    quantity={el.quantity}
                    price={el.price}
                    productId={el.productId}
                    key={index}
                    reload={setReload}
                  />
                ))}
          </div>
          <div className="close-reciept">
            <p>total {total} </p>
            <button
              className="close-reciept__button-pay"
              onClick={() => {
                if (currReciept !== 0) {
                  closeRecieptHandler(currReciept, currDate, total)
                  deleteAll(currRecieptId)
                  setCurrReciept(0)
                  setReload(true)
                } else {
                  alert('nothink to pay, please select some products in check')
                }
              }}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
