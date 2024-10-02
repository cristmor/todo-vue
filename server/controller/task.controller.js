const express = require('express')
const Task = require('../models/task.model.js')
const router = express.Router();

const getTasks = async (req, res) => {
	try {
		console.log("GET")
		const task = await Task.find({});
		res.status(200).json(task)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}

}

const addTask = async (req, res) => {
	try {
		console.log("POST:\n", req.body)
		const task = await Task.create(req.body);
		res.status(200).json(task)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}

}

const deleteTask = async (req,res) => {
	try {
		console.log("DELETE")
		const id = req.params.id
		const task = await Task.findByIdAndDelete(id);
		if(!task) {
			res.status(404).json({message: "Task not found"})
		}
		res.status(200).json(task)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}
}

module.exports = {
	getTasks,
	addTask,
	deleteTask
}
