import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import data from '../data.js'
import Product from '../models/productModel.js'
import { isAuth, isAdmin } from '../utils.js'

const productRouter = express.Router()

/* productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    console.log("Ghaaaaaaaaaaaaaaaaaa")
    const products = await Product.find({})
    res.send(products)
  }),
) */

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    console.log('in productRouter.get', req.params.country)

    const country = req.query.country || ''

    //const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};

    const countryFilter = country ? { country: { $regex: country, $options: 'i' } }: {}
    // const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({
      ...countryFilter,
    })

    res.send(products)
  }),
)


productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
  }),
)

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {

console.log('in productRouter.post')

    /* if (!req.body) {
      res.status(400).send({ message: 'Product is empty' })
    } else { */
      const product = new Product({
        productname: 'sample name' + Date.now(),
        image: '/image/p1.jpg',
        useoftile: 'sample use of tile',
        country: 'sample country',
        texture: 'sample texture',
        description: 'sample description',
        size: 'sample size',
        pricepersquaremeter: 0,
        priceperbox: 0,
        piecesinbox: 0,
        category: 'sample category',
      })
      const createdProduct = await product.save()
      res.send({ message: 'Product Created', product: createdProduct })
    //}
  }),
)

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

console.log("MOOOOOOOOOOOOOOOOO")

    if (product) {
      res.send(product)
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  }),
)

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('in productRoute.put', req.body)

    const productId = req.params.id
    const product = await Product.findById(productId)

    if (product) {
      product.productname = req.body.productname
      product.image = req.body.image
      product.useoftile = req.body.useoftile
      product.country = req.body.country
      product.texture = req.body.texture
      product.description = req.body.description
      product.size = req.body.size
      product.pricepersquaremeter = req.body.pricepersquaremeter
      product.priceperbox = req.body.priceperbox
      product.piecesinbox = req.body.piecesinbox
      product.category = req.body.category

      const updatedProduct = await product.save()
      res.send({ message: 'Product Updated', product: updatedProduct })
    } else {
      res.status(404).send({ message: 'Product not found' })
    }
  }),
)

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get(
  '/:country',
  expressAsyncHandler(async (req, res) => {
    console.log('in productRouter.get', req.params.country)

    if (!req) {
      console.log('No req found')
      return
    }

    const product = await Product.find({ country: req.params.country })
    if (product) {
      console.log('product found', product)

      res.send(product)
    } else {
      res.status(404).send({ message: 'products not found' })
    }
  }),
)


export default productRouter
