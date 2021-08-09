//importaciones
require('dotenv').config()
require('./mongo')
const jwt =  require('jsonwebtoken')
const notFound = require('./middlewere/notFound')
const handleErrors = require('./middlewere/handleErrors')


const express = require('express')
const routes = require('./routes');
const cors = require('cors')


// importar el modelo
const User = require('./models/user')
const {Event} = require('./models/events')

// crear una app de express
const app = express()

app.use(cors())
app.use(express.json())


// llamado al routes
app.use('/', routes());


// middlewere para que devuelva un 404 si no entra en ningun endpoint anterior
app.use (notFound)

//middlewere para manejar los errores
app.use (handleErrors)





// servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3003;

app.listen(PORT, host, ()=>{
    console.log(`Server is running in ${PORT}`)
})
