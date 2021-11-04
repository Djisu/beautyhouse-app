//import React from 'react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { storage } from '../firebase'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import countryList from '../countryList'

export default function ProductEditScreen(props) {
  //Get id from props
  const productId = props.match.params.id

console.log('productId===', productId)

  //Define fields for the product
  const [productname, setProductname] = useState('')
  const [image, setImage] = useState('')
  const [useoftile, setUseoftile] = useState('')
  const [country, setCountry] = useState('')
  const [texture, setTexture] = useState('')
  const [description, setDescription] = useState('')
  const [size, setSize] = useState('')
  const [pricepersquaremeter, setPricepersquaremeter] = useState('')
  const [priceperbox, setPriceperbox] = useState('')
  const [piecesinbox, setPiecesinbox] = useState('')
  const [category, setCategory] = useState('')

  //Upload file new codes
  const [url, setUrl] = useState(null)
  const [progress, setProgress] = useState(0)
  //

  //Get product details from state
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const dispatch = useDispatch()
  //Upload image new code
  const state = {
    button: 1,
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  //

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      props.history.push('/productlist')
    }
    //console.log('in dispatch(detailsProduct(productId))')

    if (!product || product._id !== productId || successUpdate) {

      console.log('in !product || product._id !== productId || successUpdate) ')

      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      console.log('in else setProductname(product.productname) ', product.productname)
      setProductname(product.productname)
      setImage(product.image)
      setUseoftile(product.useoftile)
      setCountry(product.country)
      setTexture(product.texture)
      setDescription(product.description)
      setSize(product.size)
      setPricepersquaremeter(product.pricepersquaremeter)
      setPriceperbox(product.priceperbox)
      setPiecesinbox(product.piecesinbox)
      setCategory(product.category)
    }
  }, [product, dispatch, productId, successUpdate, props.history])

  const submitHandler = (e) => {
    e.preventDefault()
    // TODO: dispatch update product
    if (state.button === 1) {
      console.log('instate.button === 1 uploadImage')

      if (image !== 'http://via.placeholder.com/50X50') {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            )
            setProgress(progress)
          },
          (error) => {
            console.log(error)
          },
          () => {
            storage
              .ref('images')
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrl(url)
              })
          },
        )
      }
    }

    if (state.button === 2) {
      //
      //TODO: dispatch update product
      console.log('in submitHandler')

      console.log(
        'document.querySelector(img).src',
        document.querySelector('img').src,
      )

      let image = document.querySelector('img').src

      console.log('image==', image)

      product.image = image
      //setImage(image)

      dispatch(
        updateProduct({
          _id: productId,
          productname,
          image,
          useoftile,
          country,
          texture,
          description,
          size,
          priceperbox,
          pricepersquaremeter,
          piecesinbox,
          category,
        }),
        setImage([]),
      )
    }
  }

  const [items] = React.useState([
    {
      label: 'Tile Product',
      value: 'Tile Product',
    },
    { label: 'Non Tile Product', value: 'Non Tile Product' },
    
  ])

  const handleUnitChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="productname">Product Name</label>
              <input
                id="productname"
                type="text"
                placeholder="Enter product name"
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
              ></input>
            </div>
            <select
            onChange={(e) => setCountry(e.target.value)}
            className="browser-default custom-select"
          >
            {countryList.map((item) => (
              <option key={item.index} value={item}>
                {item}
              </option>
            ))}
          </select>
            {/* <div>
              <label htmlFor="productname">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Enter product country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </div> */}

            <div>
              <label htmlFor="texture">Tile Texture</label>
              <input
                id="texture"
                type="text"
                placeholder="Enter tile texture"
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Enter tile description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="size">Tile Size</label>
              <input
                id="size"
                type="text"
                placeholder="Enter tile size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="pricepersquaremeter">
                Price Per Square Meter
              </label>
              <input
                id="pricepersquaremeter"
                type="text"
                placeholder="Enter price per square meter"
                value={pricepersquaremeter}
                onChange={(e) => setPricepersquaremeter(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="priceperbox">Price Per Box</label>
              <input
                id="priceperbox"
                type="text"
                placeholder="Enter price per square meter"
                value={priceperbox}
                onChange={(e) => setPriceperbox(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="piecesinbox">Pieces in a Box</label>
              <input
                id="piecesinbox"
                type="text"
                placeholder="Enter pieces in a box"
                value={piecesinbox}
                onChange={(e) => setPiecesinbox(e.target.value)}
              ></input>
            </div>

            <div>
              <br />
              Select image/photo for product
              <br />
              <progress value={progress} max="100" />
              <br />
              <input type="file" onChange={handleChange} />
              <button
                className="primary"
                type="submit"
                onClick={() => (state.button = 1)}
              >
                Upload
              </button>
              <br />
              {url}
              <br />
              <img
                className="small"
                src={url || 'http://via.placeholder.com/50X50'}
                alt="firebase-imagex"
              />
              <br />
            </div>

            <select
              onChange={(e) => handleUnitChange(e)}
              className="browser-default custom-select"
            >
              {items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <div>
              <label></label>
              <button
                className="primary"
                type="submit"
                onClick={() => (state.button = 2)}
              >
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
