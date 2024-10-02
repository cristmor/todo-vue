<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'

const emit = defineEmits(['post', 'category'])

var datePicker = ref(null)
var dateButton = ref(false)

var item = ref({
	id: 0,
	task: "",
	description: "",
	date: "",
	priority: false,
	catagory: ""
})

var showCategories = ref(false)
var categories = ref([])
var selectedCategory = ref("Default")

const addTask = async () => {
	if (item.value.task.trim() !== "") {
		await axios.post("http://localhost:5000/data", item.value)
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.error(error)
			})
		emit('post')
		item.value = {
			id: item.value.id,
			task: "",
			description: "",
			date: "",
			priority: false,
			catagory: ""
		}
		dateButton.value = false
	}
}

const clearTask = () => {
	item.value = {
		id: item.value.id,
		task: "",
		description: "",
		date: "",
		priority: false,
		catagory: ""
	}
	dateButton.value = false;
}

const setDate = (b) => {
	if (b) {
		dateButton.value = true;
		datePicker.value.showPicker()
	}
	else {
		dateButton.value = false;
		datePicker.value.blur();
		item.value.date = ""
	}
}

const setPriority = () => {
	item.value.priority = !item.value.priority
}

const setShowCategory = async () => {
	getCategories()
	// emit('category', selectedCategory.value)
	showCategories.value = !showCategories.value
}

const setCategory = (category) => {
	if (category.trim() === "") {
		showCategories.value = !showCategories.value
		return
	}
	selectedCategory.value = category
	emit('category', selectedCategory.value)
	showCategories.value = !showCategories.value
}

const getCategories = async () => {
	await axios.get("http://localhost:5000/category")
		.then(res => {
			categories.value = res.data
			console.log(categories.value)
		})
		.catch(error => {
			console.error(error)
		})
}

getCategories()
</script>

<template>
	<div class="flex-col mt-2 p-0 border-solid border-2 rounded-2xl border-gray-400">
		<div class="flex-col m-0 p-4 border-solid border-b-2 border-gray-700">
			<div class="flex">
				<div>
					<input v-model="item.task" type="text" placeholder="Task Name"
						class="block text-lg font-bold text-white w-fit m-0 mb-1 border-none outline-none bg-transparent placeholder:text-gray-400">
					<input v-model="item.description" type="text"
						class="block text-lg font-bold text-white w-fit m-0 mb-1 border-none outline-none bg-transparent placeholder:text-gray-500"
						placeholder="Description">
				</div>
				<p v-if="!item.priority" class="text-lg font-bold text-gray-500"> {{ item.date
					}}
				</p>
				<p v-else class="text-lg font-bold text-red-400"> {{ item.date }}
				</p>
			</div>

			<div class="pt-2">
				<button v-if="!dateButton" @click="setDate(true)" class="text-lg font-bold
						text-white m-0 mr-2 px-4 py-2 border-solid border-2 border-gray-500
						rounded-xl transition ease-in-out duration-200 hover:bg-gray-500">Due
					date</button>
				<button v-else @click="setDate(false)" class="text-lg font-bold
						text-white m-0 mr-2 px-4 py-2 border-solid border-2 border-gray-500
						rounded-xl bg-gray-500 transition ease-in-out duration-200 hover:bg-gray-600 hover:border-gray-600">Due
					date</button>
				<button v-if="!item.priority" @click="setPriority"
					class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-gray-500 rounded-xl transition ease-in-out duration-200 hover:bg-red-600 hover:border-red-600">Priority</button>
				<button v-else
					class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-red-600 rounded-xl bg-red-600 transition ease-in-out duration-200 hover:bg-red-700 hover:border-red-700"
					@click="setPriority">Priority</button>
				<input v-model="item.date" ref="datePicker" type="date" class="hidden" />
				<!-- <button>Reminders</button> -->
				<!-- <button>Extra</button> -->
			</div>

		</div>

		<div class="flex justify-center align-middle m-0 p-2 h-16">
			<div
				class="m-auto ml-0 border-solid border-2 border-gray-500 rounded-xl bg-[#141414] overflow-hidden select-none hover:cursor-pointer">
				<p @click="setShowCategory()"
					class="text-lg font-bold text-white m-auto px-4 py-2 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
					{{
						selectedCategory }}</p>
				<div v-if="showCategories"
					v-for="category in categories.filter(category => category !== selectedCategory)"
					@click="setCategory(category)" class="border-solid border-t-2 border-gray-700">
					<p
						class="text-lg font-bold text-white m-auto px-4 py-2 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
						{{ category }} </p>
				</div>
				<input v-if="showCategories" v-model="item.catagory"
					@keydown.enter="setCategory(item.catagory)" placeholder="New Catagory"
					class="text-lg font-bold text-white m-auto px-4 py-2 border-solid border-t-2 border-gray-700 w-40 bg-transparent transition ease-in-out duration-200 outline-none hover:bg-gray-500 hover:border-gray-500" />
			</div>
			<button @click="clearTask"
				class="text-lg font-bold text-white m-0 mr-2 px-4 py-2 border-solid border-2 border-gray-700 rounded-xl bg-gray-700 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">Cancel</button>
			<button type="submit" @click="addTask"
				class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-green-600 rounded-xl bg-green-600 transition ease-in-out duration-200 hover:bg-green-500 hover:border-green-500">Add
				task</button>
		</div>

	</div>

</template>

<style scoped></style>
