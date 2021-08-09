const Event = require('../models/events');
const User = require('../models/user');
const jwt =  require('jsonwebtoken')



exports.destacados = (req, res) => {

    Event.find({featuredEvent: true}).then(events => {
        res.json(events)
    })

}

exports.home =  (req, res) => {
    res.send('<h1>holaaa!</h1>')
}

exports.eventos = (req, res) => {

    Event.find({}).sort('date').then(events => {
        res.json(events)
    })

}


exports.eventosporid =  (req, res, next) => {
    const {id} = req.params

    Event.findById(id)
      .then(event => {
        if (event) return res.json(event)
        res.status(404).end()
      })
      .catch(err => next(err))
  }



exports.crearEvento =  async (req, res, next) => {
    const {event, date, featuredEvent, description, price} = req.body

    // sacar userId del request
    const {userId} = req

    const user = await User.findById(userId)

   if (!event) {
        return res.status(400).json({
            error: 'required "event" field is missing'
        })
    }

    const newEvent = new Event({
        featuredEvent,
        event,
        date,
        price,
        description,
        user: user._id
        })

    try {
        const saveEvent = await newEvent.save()

        user.event = user.event.concat(saveEvent._id)
        await user.save()
        res.json(saveEvent)
        }catch (err) {
            next(err)
        }

    }


exports.editar = ('/api/events/:id', (req, res, next) => {
    const {id} = req.params
    const event = req.body

    const newEventInfo = {
        event: event.event,
        date: event.date,
        price: event.price,
        description: event.description,
        featuredEvent: event.featuredEvent
    }

    // new:true es para que te devuelva el nuevo valor, sino solo lo graba y devuelve el viejo.
    Event.findByIdAndUpdate(id, newEventInfo, {new: true})
    .then(result => {
        res.json(result)
    })
})

exports.delete = ('/api/events/:id', (req, res, next) => {
    const {id} = req.params
    
    Event.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    }).catch(err => next(err))
})

