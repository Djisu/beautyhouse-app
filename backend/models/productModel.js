import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productname: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    useoftile: { type: String},
    country: { type: String, required: true },
    texture: { type: String },
    description: { type: String, required: true },
    size: { type: String },
    priceperbox: { type: Number },
    pricepersquaremeter: { type: Number },
    piecesinbox: { type: Number},
    category: { type: String },
  },
  {
    timestamp: true,
  },
)
const Product = mongoose.model('Product', productSchema)

export default Product
