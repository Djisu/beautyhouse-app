import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'

import { useDispatch, useSelector } from 'react-redux'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import { signout } from './actions/userActions'

import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import ProfileScreen from './screens/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'
import ProductListScreen from './screens/ProductListScreen'
import AdminRoute from './components/AdminRoute'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Beauty House Ltd
            </Link>
          </div>          
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            {/* <Link to="/cart">Cart</Link> */}
            {/*  {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )} */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  {/* <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li> */}
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sing In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/*  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  {/*  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li> */}
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
         
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route
            path="/search/country/:country?"
            component={SearchScreen}
            exact
          ></Route>
          <Route path="/register" component={RegisterScreen}></Route>
        
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>        

          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productList"
            component={ProductListScreen}
          ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
