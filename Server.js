const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Auth = require('./Routes/Auth')
const Post = require('./Routes/Posts')
const Follow = require('./Routes/Follow')
const UnFollow = require('./Routes/UnFollow')
const Pages = require("./models/Pages")
const Likes = require('./Routes/Likes')
const Comment = require('./Routes/Comment')
const GetUser = require('./Routes/GetUser')
const VerifyEmail = require("./Routes/VerifyEmail")
const { verifyToken } = require('./middleware/VerifyToken')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL).then((res) => {
  console.log('database Connected..');
}).catch(err => {
  console.log(err.message);
})
app.set('view engine', 'ejs');


app.use(express.json())
app.use(cors())
app.use('/api', Auth)
app.use('/api', VerifyEmail)
app.use('/api', verifyToken, Post)
app.use('/api', verifyToken, Follow)
app.use('/api', verifyToken, UnFollow)
app.use('/api', verifyToken, Likes)
app.use('/api', verifyToken, Comment)
app.use('/api', verifyToken, GetUser)

const PORT = process.env.PORT


app.listen(PORT || 5000, () => {
  console.log(`server runnig on port ${process.env.PORT}`);
})