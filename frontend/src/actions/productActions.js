import Axios from 'axios'
//import { bindActionCreators } from '../../node_modules/redux/index'
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ENTRY_REQUEST,
  PRODUCT_ENTRY_FAIL,
  PRODUCT_ENTRY_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'


export const listProducts = ({ country = '' }) => async (dispatch) => {
  console.log('in listProducts productActions', country)

  dispatch({ type: PRODUCT_LIST_REQUEST })

  try {
    const { data } = await Axios.get(`/api/products?country=${country}`)
  //const { data } = await Axios.get(`/api/products?name=${name}`);
    console.log('data===', data)

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message })
  }
}

export const enterProductDetails = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_ENTRY_REQUEST, payload: product })

  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await Axios.post('/api/products', product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: PRODUCT_ENTRY_SUCCESS, payload: data.product })
  } catch (error) {
    dispatch({
      type: PRODUCT_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    
console.log("data=", data)

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
  try {
    const { data } = await Axios.get(`/api/products/${productId}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST })

console.log('in productAction createProduct')

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    )
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: PRODUCT_CREATE_REQUEST,
      payload: message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product })

console.log('product.status===', product.status)

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message })
  }
}
