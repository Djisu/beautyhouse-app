import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


export default function ProductScreen(props) {
  const dispatch = useDispatch()
  const productId = props.match.params.id
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(detailsProduct(productId))
  }, [dispatch, productId])

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to results</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.productname}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.productname}</h1>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price Per Square Meter</div>
                      <div className="price">
                        ${product.pricepersquaremeter}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Price Per Box</div>
                      <div className="price">${product.priceperbox}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Size</div>
                      <div className="price">{product.size}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Country of Manufacture</div>
                      <div className="price">{product.country}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Texture of Tile</div>
                      <div className="Texture">{product.texture}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Pieces in a Box</div>
                      <div className="price">{product.piecesinbox}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tile Description</div>
                      <div className="price">{product.description}</div>
                    </div>
                  </li>
                  <li>              
                    <div className="row">
                      <div>Category</div>
                      <div className="price">{product.category}</div>
                    </div>
                  </li>
                  <li>
                      <div className="row">
                          <div>Status</div>
                          <div>
                              {product.status === "Available" ? (<span className="success">Available</span>
                              ) : (
                                <span className="danger"> Out of Stock</span>
                              )
                              }
                          </div>
                      </div>
                  </li> 
                  {/* <li>              
                    <div className="row">
                      <div>Status</div>
                      <div className="price">{product.status}</div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
