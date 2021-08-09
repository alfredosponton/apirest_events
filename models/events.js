const {model, Schema} = require('mongoose')

const eventSchema = new Schema ({
    
    event: String,
    date: Date,
    price: Number,
    description: String,
    featuredEvent: {type: Boolean, default: false},
    user: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
})


eventSchema.set('toJSON', {
     transform: (document, returnedObject) => {
         returnedObject.id = returnedObject._id
         delete returnedObject._id
         delete returnedObject.__v
     }
})

const Event = model('Event', eventSchema)

module.exports = Event

// Event.find({}).then(events => {
//         console.log(events)
//         mongoose.connection.close()

//     })


// const evento = new Event ({
//     event: "partidoo",
//     date: "10-05-2020",
//     price: 560,
//     description: "colon vs real madrid",
//     featuredEvent: true
// })

// evento.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })