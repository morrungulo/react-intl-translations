const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('validation of http request failed')
    error.status = 422
    throw error
  }
  next()
}