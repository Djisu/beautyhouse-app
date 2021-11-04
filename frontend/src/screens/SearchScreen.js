import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SearchScreen(props) {
  const { country = 'all' } = useParams()

  console.log('country:', country)

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {

   console.log('in useEffect()', country)

    dispatch(listProducts({ country: country !== 'all' ? country : '' }))
  }, [dispatch, country])

  return (
    <div>    
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">    
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && <MessageBox>No Products Found</MessageBox>}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
 