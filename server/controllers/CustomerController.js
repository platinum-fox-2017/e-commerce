const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const Customer  = require('../models/Customer');
const saltRound = 10;

module.exports = {
    signUp : (req,res) => {
        let customerPassword = bcrypt.hashSync(req.body.password, saltRound)

        Customer.create({
            username : req.body.username,
            password : customerPassword,
            name     : req.body.name,
            email    : req.body.email,
            gender   : req.body.gender,
            picture  : req.body.picture || null
        },(err,customer) => {
            if (err) {
                res.status(500).json({
                    message : `Fail to create new account ! ${err.message}`,
                    data    : {}
                })
            } else {
                let token = jwt.sign({userid : customer._id}, process.env.SECRET)
                res.status(200).json({
                    message : `Sign Up success !`,
                    data    : {
                        id: customer._id,
                        email: customer.email,
                        name: customer.name,
                        token: token
                    }
                })
            }
        })
    },

    signIn : (req,res) => {
        Customer.findOne({
            $or : [
                {username : req.body.username_email},
                {email    : req.body.username_email}
            ]
        })
        .exec()
        .then((customerData) => {
            if(customerData) {
                let passwordCheck = bcrypt.compareSync(req.body.password, customerData.password)
                if (passwordCheck) {
                    let token = jwt.sign({userid : customerData._id}, process.env.SECRET)
                    res.status(200).json({
                        message : `Sign in success !`,
                        data    : {
                            id : customerData._id,
                            name     : customerData.name,
                            username : customerData.username,
                            email : customerData.email,
                            gender : customerData.gender,
                            phone_number : customerData.phoneNumber,
                            picture : customerData.picture,
                            token : token
                        }
                    })
                } else {
                    res.status(202).json({
                        message : `Sign in failed, username/email or password wrong`,
                        data    : {}
                    })
                }
            } else {
                res.status(202).json({
                    message : `Sign in failed, username/email or password wrong`,
                    data    : {}
                })
            }

        })
        .catch((err) => {
            res.status(500).json({
                message : `Error occured on getting users data ${err}`
            })
        })
    },

    signInFb : (req,res) => {
        FB.api('me', { fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.headers.fb_token }, function (userFbData) {
            if(userFbData) {
                Customer.create({
                    id_fb : userFbData.id,
                    name  : userFbData.name,
                    username : null,
                    email : userFbData.email,
                    password : null,
                    gender: userFbData.gender,
                    picture : userFbData.picture.data.url
                },(err, newCustomer) => {
                    if (err) {
                        Customer.findOne({
                            email : userFbData.email,
                            id_fb : userFbData.id
                        })
                        .exec()
                        .then((customer) => {
                            let token   = jwt.sign({id : newCustomer._id}, process.env.SECRET)
                            res.status(200).json({
                                message : `Login with facebook success !`,
                                data    : ({
                                    _id   : customer._id,
                                    id_fb : customer.id_fb,
                                    name  : customer.name,
                                    email : customer.email,
                                    gender : customer.gender,
                                    picture : customer.picture,
                                    token : token
                                })
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message : `Failed to connect with facebook ! ${err}`,
                                data    : {}
                            })
                        })
                    } else {
                        let token   = jwt.sign({id : newCustomer._id}, process.env.SECRET)

                        res.status(200).json({
                            message : `Login with facebook success !`,
                            data    : ({
                                _id   : newCustomer._id,
                                id_fb : newCustomer.id_fb,
                                name  : newCustomer.name,
                                email : newCustomer.email,
                                gender : newCustomer.gender,
                                picture : newCustomer.picture,
                                token : token
                            })
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message : `Failed to connect with facebook !`,
                    data    : {}
                })
            }
        })
    },

    testJwt : (req,res) => {
        res.status(200).json({
            message : `Congrats, you reach here !`
        })
    }
}