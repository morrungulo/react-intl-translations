const express = require('express')
const { body, query } = require('express-validator')

const validateResult = require('../middleware/validateResults')
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
  validateResult,
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
  validateResult,
  folderControllers.saveFile)

module.exports = router