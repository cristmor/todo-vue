const express = require('express')
const mongoose = require('mongoose')
const Task = require('./models/task.model.js')
const TaskRoute = require('./routers/task.route.js')
const CategoryRoute = require('./routers/category.route.js')
const app = express()

// Database
mongoose.connect().then(() => {
	console.log("Connected to database!");
}).catch(() => {
	console.error("Connected failed!");
})

// Middeware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify one like 'http://example.com'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json())

// Router
app.use("/data", TaskRoute)
app.use("/category", CategoryRoute)

app.listen(5000);
