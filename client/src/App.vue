<script setup>
import { ref } from 'vue'
import axios from 'axios'

var datePicker = ref(null)
var dateButton = ref(false)

var item = ref({
	id: 0,
	task: "",
	description: "",
	date: "",
	priority: false,
	catagory: "Default"
})

var list = ref([])

const addTask = async () => {
	if (item.value.task.trim() !== "") {
		axios.post("http://localhost:5000/data", item.value)
			.then(res => {
				console.log(res)
				list.value = res.data
				item.value.id = list.value.length
			})
			.catch(error => {
			})

		item.value = {
			id: item.value.id,
			task: "",
			description: "",
			date: "",
			priority: false,
			catagory: "Default"
		}
		dateButton.value = false
	}
}

const deleteTask = async (item) => {
	axios.delete(`http://localhost:5000/data/${item.id}`)
		.then(res => {
			console.log(res)
			list.value = res.data
			item.value.id = list.value.length
		})
		.catch(error => {
		})
}

const clearTask = () => {
	item.value = {
		id: item.value.id,
		task: "",
		description: "",
		date: "",
		priority: false,
		catagory: "Default"
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

const getData = async () => {
	axios.get("http://localhost:5000/data")
		.then(res => {
			list.value = res.data
			item.value.id = list.value.length
		})
		.catch(error => {
			console.error(error)
		})
}

getData()

</script>

<template>
	<div class=" w-[800px] m-0 p-3">
		<h2 class="text-xl mb-2 p-2 w-fit border-solid border-b-2 border-gray-700"> {{ item.catagory }}</h2>

		<div v-for="task in list" @click="deleteTask(task)"
			class="flex w-fit m-0 mb-1 p-2 rounded-xl transition ease-in-out hover:cursor-pointer hover:bg-gray-700">
			<div :key="task.id" class="m-r mr-2">
				<p :key="task.id" class="text-lg font-bold text-gray-100 m-0">
					{{ task.task }}
				</p>
				<p v-if="task.description" :key="task.id"
					class="text-base font-bold text-gray-500 m-0 ">
					{{ task.description }}
				</p>
			</div>
			<div v-if="!task.priority" :key="task.id" class="m-0">
				<p v-if="task.date" :key="task.id" class="text-base text-gray-400 m-0">
					{{ task.date }}
				</p>
			</div>
			<div v-else :key="-task.id" class="m-0">
				<p v-if="task.date" :key="task.id" class="text-base text-red-400 m-0">
					{{ task.date }}
				</p>
			</div>

		</div>

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
					<input v-model="item.date" ref="datePicker" type="date" style="display: none"
						className="input-task-date" />
					<button v-if="!item.priority" @click="setPriority"
						class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-gray-500 rounded-xl transition ease-in-out duration-200 hover:bg-red-600 hover:border-red-600">Priority</button>
					<button v-else
						class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-red-600 rounded-xl bg-red-600 transition ease-in-out duration-200 hover:bg-red-700 hover:border-red-700"
						@click="setPriority">Priority</button>
					<!-- <button>Reminders</button> -->
					<!-- <button>Extra</button> -->
				</div>

			</div>

			<div class="flex justify-center align-middle m-0 p-2">
				<a
					class="text-lg font-bold text-white m-auto ml-0 px-4 py-2 rounded-xl transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">{{
						item.catagory }}</a>
				<button @click="clearTask"
					class="text-lg font-bold text-white m-0 mr-2 px-4 py-2 border-solid border-2 border-gray-700 rounded-xl bg-gray-700 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">Cancel</button>
				<button type="submit" @click="addTask"
					class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-green-600 rounded-xl bg-green-600 transition ease-in-out duration-200 hover:bg-green-500 hover:border-green-500">Add
					task</button>
			</div>

		</div>
	</div>
</template>

<style scoped></style>
