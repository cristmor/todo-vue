<script setup>
import { ref } from 'vue'

var id = 0;

var datePicker = ref(null)

var item = ref({
	id: 0,
	task: "",
	description: "",
	date: "",
	priority: false,
	catagory: ""
})

var list = ref([
	{
		id: id++,
		task: "Clean room",
		description: "clean",
		date: "2024-01-25",
		priority: false,
		catagory: "test"
	},
	{
		id: id++,
		task: "Feed Cats",
		description: "feed",
		date: "2024-01-25",
		priority: false,
		catagory: "test"
	},
	{
		id: id++,
		task: "Go to Gym",
		description: "gym",
		date: "2024-01-25",
		priority: false,
		catagory: "test"
	}
])

const addTask = () => {
	if (item.value.task.trim() !== "") {
		list.value.push(item.value)
		item.value = { id: 0, task: "", description: "" }
	}
}

const deleteTask = (item) => {
	list.value = list.value.filter((task) => task !== item)
}

const clearTask = () => {
	item.value = {
		id: 0,
		task: "",
		description: "",
		date: "",
		priority: false,
		catagory: ""
	}
}

const setDate = () => {
	datePicker.value.showPicker()
}

</script>

<template>
	<div className="app-container">
		<h2>Test</h2>

		<div v-for="item in list" @click="deleteTask(item)" className="todo-list">
			<div :key="item.id" className="text-container">
				<p :key="item.id" className="item-title">
					{{ item.task }}
				</p>
				<p v-if="item.description" :key="item.id" className="item-description">
					{{ item.description }}
				</p>
			</div>
			<div :key="item.id" className="date-container">
				<p v-if="item.date" :key="item.id" className="item-date">
					{{ item.date }}
				</p>
			</div>
		</div>

		<div className="input-form">


			<div className="input-field">
				<input v-model="item.task" type="text" className="input-task" placeholder="Task Name">
				<input v-model="item.description" type="text" className="input-description"
					placeholder="Description">

				<div className="button-container">
					<button @click="setDate" className="task-date">Due date</button>
					<input v-model="item.date" ref="datePicker" type="date" style="display: none"
						className="input-task-date" />
					<button>Priority</button>
					<!-- <button>Reminders</button> -->
					<!-- <button>Extra</button> -->
				</div>

			</div>

			<div className="input-submit">
				<a>test</a>
				<button @click="clearTask" className="cancel-button">Cancel</button>
				<button type="submit" @click="addTask" className="add-button">Add task</button>
			</div>

		</div>
	</div>
</template>

<style scoped>
.app-container {
	font-size: 1.2rem;
	width: 800px;

	margin: 0px;
	padding: 25px;
}

.app-container button {
	font-size: 1.2rem;
	font-weight: bold;
	color: white;

	margin: 0px;
	margin-right: 10px;
	padding: 10px 15px;

	border: 2px solid hsl(0, 0%, 35%);
	border-radius: 10px;
	background-color: hsl(0, 0%, 8%);
	transition: background-color 0.25s ease;
}

.app-container button:hover {
	cursor: pointer;
	background-color: hsl(0, 0%, 35%);
}

.app-container button:active {
	cursor: pointer;
	background-color: hsl(0, 0%, 8%);
}

.input-task-date::placeholder {
	color: black;
}

.todo-list {
	display: flex;
	flex-direction: row;
	width: fit-content;
	margin: 0px;
	margin-bottom: 5px;
	padding: 15px;

	border-radius: 15px;
	transition: background-color 0.25s ease;
}

.todo-list:hover {
	cursor: pointer;
	background-color: hsl(0, 0%, 35%);
}

.todo-list p {
	margin: 0px;
	padding: 0px;
}

.todo-list .date-container {
	font-weight: normal;
	color: hsl(0, 0%, 80%);
	margin-left: 10px;
}

.item-description {
	margin: 5px;
	font-size: 1.0rem;
	font-weight: normal;
	color: hsl(0, 0%, 60%);
}

.input-form {
	margin-top: 10px;
	padding: 0px;

	border: 2px solid hsl(0, 0%, 60%);
	border-radius: 14px;
}

.input-field {
	display: flex;
	flex-direction: column;

	margin: 0px;
	padding: 15px;

	border-bottom: 2px solid hsl(0, 0%, 35%);
}

.input-field input {
	font-size: 1.2rem;
	font-weight: bold;
	color: white;

	margin: 0px;
	margin-bottom: 10px;

	border: none;
	outline: none;
	background-color: hsl(0, 0%, 8%);
	user-select: none;
}

.input-task::placeholder {
	color: hsl(0, 0%, 60%);
}

.button-container {
	margin: 0px;
	padding: 10px 0px;
	padding-bottom: 0px;
}

.input-submit {
	display: flex;
	justify-content: center;
	align-items: center;

	margin: 0px;
	padding: 10px;
}

.input-submit button {
	margin: auto;
	margin-right: 10px;

	border: none;
}

.input-submit .cancel-button {
	background-color: hsl(0, 0%, 28%);
}

.input-submit .add-button {
	margin: 0px;
	background-color: hsl(125, 100%, 25%);
}

.input-submit .add-button:hover {
	background-color: hsl(125, 100%, 25%);
}


.input-submit .add-button:hover {
	background-color: hsl(125, 100%, 35%);
}

.input-submit .add-button:active {
	background-color: hsl(125, 100%, 25%);
}


.input-submit a {
	margin: auto;
	margin-left: 0px;
	padding: 10px 15px;
	border-radius: 15px;
}

.input-submit a:hover {
	margin: auto;
	margin-left: 0px;
	padding: 10px 15px;
	background-color: hsl(0, 0%, 35%);
}
</style>
