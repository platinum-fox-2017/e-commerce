const express = require('express')
const index = express.Router()

index.get('/', (req, res) => {
  res.send(200).json({
    message: 'Connected to server'
  })
})

module.exports = index