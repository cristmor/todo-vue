var express = require('express')
var app = express()
const {data} = require('./data')

var modData = data;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify one like 'http://example.com'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())

app.get('/data',(req, res) => {
	res.status(200).json(modData)
})

app.post('/data',(req, res) => {
	modData.push(req.body)
	res.status(201).json(modData)
})

app.delete('/data/:id', (req,res) => {
	const id = req.params.id
	modData = modData.filter((item) => item.id !== Number(id))
	console.log(modData)
	res.status(202).json(modData)
})


app.listen(5000);
