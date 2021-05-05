const chalk = require('chalk')

module.exports.use404 = (req, res, next) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

module.exports.use500 = (error, req, res, next) => {
  console.log(chalk.yellow(error))
  const status = error.status || 500
  const message = error.message
  res.status(status).json({ error: message })
}