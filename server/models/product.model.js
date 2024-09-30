const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			default: 0
		},
		task: {
			type: String,
			required: true,
			default: ""
		},
		description: {
			type: String,
			required: true,
			default: ""
		},
		date: {
			type: String,
			required: true,
			default: ""
		},
		priority: {
			type: Boolean,
			required: true,
			default: false
		},
		catagory: {
			type: String,
			required: true,
			default: ""
		},
	}
);

const Product = mongoose.model("Task", ProductSchema);

module.exports = Product;
