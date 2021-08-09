const express = require("express")
const router = express.Router()

// importar express validator
const { check,  body } = require("express-validator")

// importar el controlador
const eventController = require("../controllers/eventController")
const userController = require("../controllers/userController")
const login = require("../controllers/login")
const userExtractor = require("../middlewere/userExtractor")



module.exports = function () {
  //ruta para el home
  router.get("/", eventController.home)

  // listar eventos destacados
  router.get("/api/events/destacados", eventController.destacados)

  // listar eventos
  router.get("/api/events", eventController.eventos)

  router.get("/api/events/:id", eventController.eventosporid)
 
 // crear usuarios
 router.get('/api/users', userController.users)
 router.post('/api/users', userController.createUser)
 
 // login
 router.post('/api/login', login.loginRouter)
 
 
 // crear un neuvo evento
  router.post(
    "/api/nuevo-evento", 
    userExtractor.userExtractor,
    eventController.crearEvento,
    body("event").not().isEmpty().trim().escape()
  )

  // actualizar un evento
  router.put(
    "/api/events/:id", 
    userExtractor.userExtractor,
    eventController.editar)

  //eliminar evento
  router.delete(
    "/api/events/:id", 
    userExtractor.userExtractor,
    eventController.delete
  )

  return router
};
