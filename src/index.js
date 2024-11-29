const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const employeeRoute = require('./routes/employeeRoutes')
const taskRoute = require('./routes/task')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const app = express()
const {PORT, MONGODB_STRING} = process.env

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

mongoose.connect(MONGODB_STRING,{
    useNewUrlParser : true
}).then(()=> console.log("MongoDB is Connected"))
.catch((error) => console.log(error))


app.use('/api/auth', authRoute)
app.use('/api/users', employeeRoute)
app.use('/api/tasks', taskRoute)

app.listen(PORT, ()=>{
    console.log(`Express app is ruuning on port ${PORT}`)
})