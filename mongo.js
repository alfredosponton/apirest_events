const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
? MONGO_DB_URI_TEST
: MONGO_DB_URI

if (!connectionString) {
    console.error('Debes tener un archivo.env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string.')
  }

// conexion a mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})

.then(() => {
    console.log('Database conected')
}).catch(err => {
    console.error(err)
})

// buena practica para que si encuentra un error se desconecte
process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })