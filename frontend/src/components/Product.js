import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {
  const { product } = props

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.productname} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.productname}</h2>
        </Link>
        <h2>{product.country}</h2>
        <h2>{product.texture}</h2>
        {/* <h2>{product.status}</h2> */}
        <h2>
            {product.status === "Available" ? (<span className="success">Available</span>
            ) : (
              <span className="danger"> Out of Stock</span>
            )
            }
        </h2>
       {/*  <h2>{product.size}</h2>
        <div className="price">${product.pricepersquaremeter}</div> */}
      </div>
    </div>
  )
}
