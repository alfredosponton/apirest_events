const bcrypt = require('bcrypt')
const User = require('../models/user');

exports.users = async (req, res) => {
    const users = await User.find({}).populate('event', {        
    })
    res.json(users)
}

exports.createUser = async (req, res) => {
    const {body} = req
    const {userName, name, password} = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        userName,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
}
