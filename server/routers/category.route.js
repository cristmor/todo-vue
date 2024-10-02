const express = require('express')
const router = express.Router();
const { getCategory } = require('../controller/category.controller.js')

router.get("/", getCategory)

module.exports = router
