import { $host } from './main'

// product
export const createProduct = async (name, price) => {
  const { data } = await $host.post('api/product', { name, price })
  return data
}
export const fetchProducts = async () => {
  const { data } = await $host.get('api/product')
  return data
}

export const deleteProduct = async (id) => {
  const { data } = await $host.delete('api/product/delete/' + id)
  return data
}
// reciept
export const createReciept = async (number, total) => {
  const { data } = await $host.post('api/reciept', { number, total })
  return data
}
export const fetchReciept = async () => {
  const { data } = await $host.get('api/reciept')
  return data
}

export const closeReciept = async (number, date, total) => {
  const { data } = await $host.patch('api/reciept/update', {
    number,
    date,
    total,
  })
  return data
}
// product in reciept
export const createProdInRec = async (
  price,
  productId,
  recieptId,
  quantity = 1
) => {
  const { data } = await $host.post('api/product_reciept', {
    price,
    productId,
    recieptId,
    quantity,
  })
  return data
}
export const fetchProdInRec = async () => {
  const { data } = await $host.get('api/product_reciept')
  return data
}
export const deleteProdInRec = async (productId) => {
  const { data } = await $host.delete('api/product_reciept/delete/' + productId)
  return data
}
export const deleteAll = async (recieptId) => {
  const { data } = await $host.delete(
    'api/product_reciept/deleteAll/' + recieptId
  )
  return data
}

export const updateQuantProdInRec = async (productId, quantity) => {
  const { data } = await $host.patch('api/product_reciept/patch', {
    productId,
    quantity,
  })
  return data
}
