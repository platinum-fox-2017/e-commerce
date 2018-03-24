const User = require("../models/user")
const jwt = require('jsonwebtoken');
const FB = require('fb');

const addUser = (req, res) => {
  FB.api('/me', {
    fields: ['id', 'name', 'email'],
    access_token: req.headers.access_token
}, function (response) {
    if (!response || response.error) {
        console.log(!response ? 'error occurred' : response.error);
        return;
    } else {
        User.findOne({
                email: response.email
            })
            .then(user => {
                if (user) {
                    let token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        name: user.name
                    }, process.env.JWT)
                    res.json({
                        token
                    })
                } else {
                    User.create({
                        email: response.email,
                        name: response.name
                    }, (err, data) => {
                        let token = jwt.sign({
                            id: data._id,
                            email: data.email,
                            name: data.name
                        }, process.env.JWT)

                    })
                }
            })
    }
})

}

module.exports = {
  addUser
}
