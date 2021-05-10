const express = require('express')
const { body, query } = require('express-validator')

const validateResultMiddleware = require('../middleware/validateResults')
const folderControllers = require('../controllers/folderControllers')

const router = express.Router()

router.get('/', folderControllers.getFiles)

router.get('/load',
  [
    query('name')
      .trim()
      .not()
      .isEmpty()
  ],
  validateResultMiddleware,
  folderControllers.loadFile)

router.post('/save',
  [
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('data')
      .not()
      .isEmpty()
  ],
  validateResultMiddleware,
  folderControllers.saveFile)

module.exports = router