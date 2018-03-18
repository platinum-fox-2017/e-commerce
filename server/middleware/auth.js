const jwt = require('jsonwebtoken')

module.exports = {
	auth: function(req, res, next) {
		var decoded = jwt.verify(req.headers.tokenjwt, 'secretKey')
		if(decoded) {
			req.decoded = decoded.user
			next()
		}	else {
			res.send('You are not Authenticated')
		}
	}
}

