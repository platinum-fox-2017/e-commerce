const bcrypt = require('bcrypt')
const saltRounds = 10;
const Admin = require('../models/admin')
const salt = bcrypt.genSaltSync(saltRounds)
const jwt = require('jsonwebtoken')

const createAdmin = (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);

    const admin = new Admin()
    admin.email = req.body.email
    admin.username = req.body.username
    admin.password = hash

    admin.save()
        .then((data) => {
            res.status(201).json({
                message: 'Admin Created'
            })
        }).catch((err) => {
            res.status(500).json({
                err
            })
        })
}

const loginAdmin = (req, res) => {
    Admin.findOne({
        email: req.body.email
    }).then((data) => {
        if (bcrypt.compareSync(req.body.password, data.password)) {
            var token = jwt.sign({
                id: data._id,
                email: data.email,
                username: data.username,
            }, process.env.JWT);

            res.status(200).json({
                message: 'Admin Login',
                token
            })
        } else {
            res.status(401).json({
                message: 'Password is wrong'
            })
        }
    })
}

module.exports = {
    createAdmin,
    loginAdmin
}