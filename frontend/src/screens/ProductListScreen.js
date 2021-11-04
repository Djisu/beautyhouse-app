import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts, deleteProduct} from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'

function ProductListScreen(props) {
 // const userSignin = useSelector((state) => state.userSignin)
 // const { userInfo } = userSignin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch()

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      props.history.push(`/product/${createdProduct._id}/edit`)
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    
    const country = ''
    dispatch(listProducts({ country }))
    //dispatch(listProducts())
  }, [createdProduct, dispatch, props.history, successCreate, successDelete])

  const deleteHandler = (product) => {
    console.log('in  deleteHandler = (product)', product._id)
    
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  }
  const createHandler = () => {
    console.log('in createHandler')
    dispatch(createProduct())
  }

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead style={{ backgroundColor: 'blueviolet', color: 'white' }} >
            <tr>
              {/* <th>ID</th> */}
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE PER SQ METER</th>
              <th>PRICE PER BOX</th>
              <th>PIECES IN A BOX</th>
              <th>CATEGORY</th>
              <th>TEXTURE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                {/* <td>{product._id}</td> */}
                <td style={{ textAlign: 'center', padding: '2rem' }}>
                    <img className="small" src={product.image} alt={product.name} />
                </td> 
                
                <td>{product.productname}</td>
                <td>{product.pricepersquaremeter}</td>
                <td>{product.priceperbox}</td>
                <td>{product.piecesinbox}</td>
                <td>{product.category}</td>
                <td>{product.texture}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProductListScreen
