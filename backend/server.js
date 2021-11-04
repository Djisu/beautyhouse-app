import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import * as path from 'path'

import { keys } from './config/keys.js'
import cors from 'cors'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const { mongoURI } = keys

//const { mongoURI } = keys
//console.log('mongoURI===',mongoURI )

const app = express()

app.use((req,res,next)=>{
  res.setHeader('Acces-Control-Allow-Origin','*');
  res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
  next(); 
})

//middleware for parsing json data to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to our database
mongoose.connect(mongoURI, function (error) {
  // Do things once connected
  if (error) {
    console.log('Database error or database connection error ' + error);
  }
  //console.log('Database state is ' + mongoose.connection.readyState);
});


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

const __dirname = path.resolve()

/* const moo = __dirname + '/uploads'
console.log('moo===', moo) */

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html')),
)
/* app.get('/', (req, res) => {
  res.send('Server is ready')
}) */

//To detect errors middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})

//console.log("mongoose.connection.readyState==", mongoose.connection.readyState);
