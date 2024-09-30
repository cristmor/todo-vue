const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const app = express()
const {data} = require('./data')

var modData = data;

mongoose.connect(connection).then(() => {
	console.log("Connected to database!");
}).catch(() => {
	console.error("Connected failed!");
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify one like 'http://example.com'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())

app.get('/data', async (req, res) => {
	try {
		console.log("GET")
		const product = await Product.find({});
		res.status(200).json(product)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}

})

app.post('/data', async (req, res) => {

	try {
		console.log("POST:\n", req.body)
		const product = await Product.create(req.body);
		res.status(200).json(product)
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}

})

app.delete('/data/:id', async (req,res) => {
	console.log(modData)
	try {
		console.log("DELETE")
		const id = req.params.id
		const product = await Product.deleteOne({id: id});
		if(!product) {
			res.status(404).json({message: "Task not found"})
		}

		res.status(200).json({message: "Task Delete Successfully"})
	} catch(error) {
		console.error(error);
		res.status(500).json({message: error.message})
	}
})


app.listen(5000);
