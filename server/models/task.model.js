const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
			default: ""
		},
		description: {
			type: String,
			required: false,
			default: ""
		},
		date: {
			type: String,
			required: false,
			default: ""
		},
		priority: {
			type: Boolean,
			required: false,
			default: false
		},
		catagory: {
			type: String,
			required: false,
			default: "Default"
		},
	}
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
