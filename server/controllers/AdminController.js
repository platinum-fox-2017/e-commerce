const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const Customer  = require('../models/Customer');
const saltRound = 10;

module.exports = {
    signIn : (req,res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username == 'admin' && password == 'admin') {
            let token = jwt.sign({username : username}, process.env.SECRET)
            res.status(200).json({
                message : `Sign in success !`,
                data    : {
                    username : username,
                    password : password,
                    token    : token
                }
            })
        } else {
            res.status(400).json({
                message : `Sign in failed, username/email or password wrong`,
                data    : {}
            })
        }
    },

    testJwt : (req,res) => {
        res.status(200).json({
            message : `Congrats, you reach here !`
        })
    }
}