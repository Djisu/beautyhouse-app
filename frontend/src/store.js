import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers'
import {
  productDetailsReducer,
  productListReducer,
  enterProductDetailsReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  userListReducer, 
  userRegisterReducer,
   userSigninReducer, 
   userUpdateProfileReducer } from './reducers/userReducer'


const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
 /*  product: {
    productItems: localStorage.getItem('productItems')
      ? JSON.parse(localStorage.getItem('productItems'))
      : {}, */
   /*  productDetails: localStorage.getItem('productDetails')
      ? JSON.parse(localStorage.getItem('productDetails'))
      : {}, 
  },*/
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  enterProductDetails: enterProductDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
)

export default store
