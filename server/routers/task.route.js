const express = require('express')
const router = express.Router();
const { getTasks, addTask, deleteTask } = require('../controller/task.controller.js')

router.get("/", getTasks).post("/", addTask)
router.delete("/:id", deleteTask)

module.exports = router
