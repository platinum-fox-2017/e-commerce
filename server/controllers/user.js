const User = require('../models/user');
const FB = require('fb');
const token = require('../middlewares/token');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    masuk: function (req, res) {
        User.findOne({
            email: req.body.email
        }).then(data_user => {
            bcrypt.compare(req.body.password, data_user.password, function (err, response) {
                if (response) {
                    const token = jwt.sign({id: data_user._id, name: data_user.name}, process.env.SECRET)
                    res.status(200).json({
                        message: 'login success',
                        name: data_user.name,
                        token: token
                    })
                } else {
                    res.status(500).json({
                        message: 'password incorrect'
                    })
                }
            })
        }).catch(error => {
            res.status(500).json({
                message: 'email or passord incorrect'
            })
        })
    },
    signUp: function (req, res) {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const user = new User()
        user.name = req.body.name
        user.email = req.body.email
        user.password = hash
        user.save().then(data_user => {
            res.status(200).json({
                message: 'success create user',
                data_user
            })
        })
    },
    signIn: function (req, res) {
        FB.setAccessToken(req.body.accessToken)
        FB.api('me', { fields: ['id', 'name', 'email'], access_token: req.body.access_token }, (data) => {
            if (!data.error) {
                let newUser = new User({
                    id_fb: data.id,
                    name: data.name,
                    email: data.email,
                    role: 'user'
                })
                User.findOne({ id_fb: data.id }).exec()
                .then(user => {
                    if (user) {
                        return res.status(200).json({
                            message: 'signin success',
                            name: user.name,
                            id: user._id,
                            token: token.generate({ ...user._doc, access_token: req.body.access_token })
                        })
                    } else {
                        newUser.save(err => {
                            if (err) return res.status(500).json({ message: err })
                            return res.status(200).json({
                                message: 'New User succrssfully created',
                                id: newUser._id,
                                token: token.generate({ ...newUser._doc, access_token: req.body.access_token })
                            })
                        })
                    }
                }).catch(err => res.status(500).json(err))
            }
        })
    }
}
