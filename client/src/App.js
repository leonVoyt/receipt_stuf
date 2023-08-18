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
import InRecieptItem from './components/InRecieptItem'
import { Context } from './context/Context'
import { useTotalPrice } from './hooks/useTotalPrice'
import { useDate } from './hooks/useDate'
import CreateProductModal from './components/modal/CreateProduct'

const App = () => {
  const [pageLoaded, setPageLoaded] = useState(false)
  const [products, setProducts] = useState([])
  const [productsInRec, setProductsInRec] = useState([])
  const [reciepts, setReciepts] = useState([])

  const [vision, setVision] = useState(false)
  const [currReciept, setCurrReciept] = useState(0)
  const [currRecieptId, setCurrRecieptId] = useState(0)
  const [reload, setReload] = useState(false)
  const [reciepLoad, setReciepLoad] = useState(false)
  const [modalType, setModalType] = useState('')

  const total = useTotalPrice(productsInRec)
  const currDate = useDate()

  const reloadHandler = () => {
    setReload(!reload)
  }
  const closeRecieptHandler = (number, date, total) => {
    closeReciept(number, date, total)
  }

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setPageLoaded(true)
    })
    function handleClick() {
      setVision(false)
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    fetchReciept().then((data) => {
      setReciepts(data)
      setCurrRecieptId(data[data.length - 1].id)
      if (data[data.length - 1].date === null) {
        return data.length && setCurrReciept(data[data.length - 1].number)
      }
      return 0
    })
  }, [reciepLoad])

  useEffect(() => {
    fetchProdInRec().then(async (data) => {
      await setProductsInRec(data)
      console.log(data[0])
    })
  }, [reload])
  return (
    <Context.Provider
      value={{
        total,
        productsInRec,
        currReciept,
        setCurrReciept,
        setReciepLoad,
        reciepLoad,
        setProductsInRec,
      }}
    >
      {pageLoaded ? (
        <div className="main">
          <CreateProductModal
            vision={vision}
            type={modalType}
            reload={reloadHandler}
            products={products}
            setProducts={setProducts}
            setVision={setVision}
          />
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
                  e.stopPropagation()
                  setModalType('')
                }}
              >
                add product
              </button>
              <button
                className="button__delete"
                onClick={(e) => {
                  setVision(true)
                  e.stopPropagation()
                  setModalType('delete')
                }}
              >
                delete product
              </button>
            </div>

            <div className="product-list">
              <h1>Menu</h1>
              {products.length !== 0 &&
                products.map((product) => (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    reciepts={reciepts}
                    reload={reloadHandler}
                  ></ProductItem>
                ))}
            </div>
          </div>

          <div className={`right ${currReciept === 0 ? '' : 'right--active'}`}>
            <h2>Check #{currReciept !== 0 ? currReciept : ''}</h2>
            <hr />
            <div className="topBar">
              <div className="recieptName">
                <h2>Name</h2>
              </div>
              <div className="quantity">
                <h2>quantity</h2>
              </div>
              <div className="price">
                <h2>price</h2>
              </div>
            </div>
            <div className="reciepts__list">
              {productsInRec.length !== 0
                ? productsInRec
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
                        reload={reloadHandler}
                        products={products}
                      />
                    ))
                : ''}
            </div>
            <div className="close-reciept">
              <p>total {total} ₴</p>

              <button
                className="close-reciept__button-pay"
                onClick={() => {
                  if (currReciept !== 0) {
                    closeRecieptHandler(currReciept, currDate, total)
                    deleteAll(currRecieptId).then(() => {
                      setCurrReciept(0)
                      setReload(!reload)
                    })
                  } else {
                    alert(
                      'nothink to pay, please select some products in check'
                    )
                  }
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Context.Provider>
  )
}

export default App
