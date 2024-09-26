<script setup>
import { ref } from 'vue'

var id = 0;

var item = ref({
	id: 0,
	task: "",
	description: ""
})
var list = ref([
	{
		id: id++,
		task: "Clean room",
		description: ""
	},
	{
		id: id++,
		task: "Feed Cats",
		description: ""
	},
	{
		id: id++,
		task: "Go to Gym",
		description: ""
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
	item.value = { id: 0, task: "", description: "" }
}

</script>

<template>
	<div className="app-container">
		<h2>Test</h2>
		<div v-for="item in list" className="todo-list">
			<p :key="item.id" className="item-title" @click="deleteTask(item)">{{ item.task }}</p>
			<p :key="item.id" className="item-description">{{ item.description }}</p>
		</div>
		<div className="input-form">
			<form @submit.prevent="addTask">
				<div className="input-field">
					<input v-model="item.task" type="text" className="input-task"
						placeholder="Task Name">
					<input v-model="item.description" type="text" className="input-description"
						placeholder="Description">
					<div className="button-container">
						<button>Due date</button>
						<button>Priority</button>
						<button>Reminders</button>
						<button>Extra</button>
					</div>
				</div>
				<div className="input-submit">
					<a>test</a>
					<button @click="clearTask" className="cancel-button">Cancel</button>
					<button type="submit" className="add-button">Add task</button>
				</div>
			</form>
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
	background-color: hsl(0, 0%, 20%);
	transition: background-color 0.25s ease;
}

.app-container button:hover {
	cursor: pointer;
	background-color: hsl(0, 0%, 35%);
}

.app-container button:active {
	cursor: pointer;
	background-color: hsl(0, 0%, 20%);
}

.todo-list {
	width: fit-content;
	margin: 0px;
	margin-bottom: 5px;
	padding: 15px;

	border-radius: 15px;
	transition: background-color 0.25s ease;
}

.todo-list:hover {
	cursor: pointer;
	background-color: hsl(0, 0%, 20%);
}

.todo-list p {
	margin: 0px;
	padding: 0px;
}

.input-form {
	margin-top: 10px;
	padding: 0px;

	border: 2px solid hsl(0, 0%, 60%);
	border-radius: 14px;
	background-color: hsl(0, 0%, 20%);
}

.input-field {
	display: flex;
	flex-direction: column;

	margin: 0px;
	padding: 15px;

	border-bottom: 2px solid hsl(0, 0%, 35%);
}

.input-form input {
	font-size: 1.2rem;
	font-weight: bold;
	color: white;

	margin: 0px;
	margin-bottom: 10px;

	border: none;
	outline: none;
	background-color: hsl(0, 0%, 20%);
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
