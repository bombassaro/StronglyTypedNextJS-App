const express = require('express')
const router = express.Router()

const {load_data} = require('./policy')

router.get('/policy/:policy', load_data)

module.exports = router