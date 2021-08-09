const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.loginRouter = async (req, res) => {
    const {body} = req
    const {userName, password} = body

    const user = await User.findOne({ userName })
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            err: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id, 
        userName: user.userName
    }

    const token = jwt.sign(userForToken, process.env.SECRET,
        {
            expiresIn: 60 * 60 * 3
        })

    res.send ({
        name: user.name, 
        userName: user.userName,
        token
    })
}  