const express = require('express')
const Task = require('../models/task.model.js')
const router = express.Router();

const getCategory = async (req, res) => {
	try {
		console.log("GET")
		const category = await Task.distinct('catagory');
		res.status(200).json(category)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}
}

module.exports = { getCategory }
