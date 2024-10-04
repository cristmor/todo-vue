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
		item.value.catagory = selectedCategory;
		await axios.post("/data", item.value)
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
	await axios.get("/category")
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
	<div class="flex-col mt-2 p-0 w-fit border-solid border-2 rounded-2xl border-gray-400">
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
				<div class="flex">
					<div v-if="!dateButton" @click="setDate(true)" class="select-none cursor-pointer flex align-middle w-fit m-0 mr-2 px-4 pl-3 py-2 border-solid border-2 border-gray-500
						rounded-xl transition ease-in-out duration-200 hover:bg-gray-500">
						<svg class=" m-auto mr-2 h-5 w-5 text-white" width="24" height="24"
							viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
							fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" />
							<rect x="4" y="5" width="16" height="16" rx="2" />
							<line x1="16" y1="3" x2="16" y2="7" />
							<line x1="8" y1="3" x2="8" y2="7" />
							<line x1="4" y1="11" x2="20" y2="11" />
							<line x1="11" y1="15" x2="12" y2="15" />
							<line x1="12" y1="15" x2="12" y2="18" />
						</svg>
						<p class="text-lg font-bold
						text-white">Due
							date</p>

					</div>
					<div v-else @click="setDate(false)" class="select-none cursor-pointer flex align-middle w-fit m-0 mr-2 px-4 pl-3 py-2 border-solid border-2 border-gray-500
						rounded-xl bg-gray-500 transition ease-in-out duration-200 hover:bg-gray-600 hover:border-gray-600">
						<svg class="m-auto mr-2 h-5 w-5 text-white" width="24" height="24"
							viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
							fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" />
							<rect x="4" y="5" width="16" height="16" rx="2" />
							<line x1="16" y1="3" x2="16" y2="7" />
							<line x1="8" y1="3" x2="8" y2="7" />
							<line x1="4" y1="11" x2="20" y2="11" />
							<line x1="11" y1="15" x2="12" y2="15" />
							<line x1="12" y1="15" x2="12" y2="18" />
						</svg>
						<p class="text-lg font-bold
						text-white">Due
							date</p>
					</div>


					<div v-if="!item.priority" @click="setPriority" class="select-none cursor-pointer flex algin-middle m-0 px-4 pl-3 py-2 border-solid
						border-2 border-gray-500 rounded-xl transition ease-in-out duration-200
						hover:bg-red-600 hover:border-red-600">
						<svg class="m-auto mr-2 h-5 w-5 text-white" viewBox="0 0 24 24"
							fill="none" stroke="currentColor" stroke-width="2"
							stroke-linecap="round" stroke-linejoin="round">
							<path
								d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
							<line x1="4" y1="22" x2="4" y2="15" />
						</svg>
						<p class="text-lg font-bold text-white">
							Priority</p>
					</div>
					<div v-else @click="setPriority"
						class="select-none cursor-pointer flex algin-middle m-0 px-4 pl-3 py-2 border-solid border-2 border-red-600 rounded-xl bg-red-600 transition ease-in-out duration-200 hover:bg-red-700 hover:border-red-700">
						<svg class="font-bold m-auto mr-2 h-5 w-5 text-white"
							viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path
								d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
							<line x1="4" y1="22" x2="4" y2="15" />
						</svg>
						<p class="text-lg font-bold text-white">Priority</p>
					</div>
				</div>
				<input v-model="item.date" ref="datePicker" type="date" class="hidden" />
				<!-- <button>Reminders</button> -->
				<!-- <button>Extra</button> -->
			</div>
		</div>

		<div class="flex justify-center align-middle m-0 p-2 h-16">
			<Transition name="expand">
				<div
					class="m-auto ml-0 mr-2 border-solid border-2 border-gray-500 rounded-xl bg-[#141414] overflow-hidden select-none hover:cursor-pointer">
					<div @click="setShowCategory()"
						class="z-10 flex align-middle m-auto px-4 py-2 pr-1 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
						<p class="text-lg font-bold text-white m-auto mx-0">
							{{
								selectedCategory }}
						</p>

						<Transition name="rotate-in">
							<svg v-if="!showCategories"
								class="h-4 w-4 p-0 m-auto mx-2 text-white inline"
								width="24" height="24" viewBox="0 0 24 24"
								stroke-width="2" stroke="currentColor" fill="none"
								stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" />
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</Transition>

						<Transition name="rotate-out">
							<svg v-if="showCategories"
								class="h-4 w-4 p-0 m-auto mx-2 text-white inline"
								width="24" height="24" viewBox="0 0 24 24"
								stroke-width="2" stroke="currentColor" fill="none"
								stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" />
								<polyline points="6 15 12 9 18 15" />
							</svg>
						</Transition>


					</div>
					<TransitionGroup name="fade">
						<div v-if="showCategories"
							v-for="category in categories.filter(category => category !== selectedCategory)"
							@click="setCategory(category)"
							class="z-0 border-solid border-t-2 border-gray-700">
							<p
								class="text-lg font-bold text-white m-auto px-4 py-2 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
								{{ category }} </p>
						</div>
						<input v-if="showCategories" v-model="item.catagory"
							@keydown.enter="setCategory(item.catagory)"
							placeholder="New Catagory"
							class="text-lg font-bold text-white m-auto px-4 py-2 border-solid border-t-2 border-gray-700 w-40 bg-transparent transition ease-in-out duration-200 outline-none hover:bg-gray-500 hover:border-gray-500" />
					</TransitionGroup>
				</div>
			</Transition>
			<button @click="clearTask"
				class="text-lg font-bold text-white m-0 mr-2 px-4 py-2 border-solid border-2 border-gray-700 rounded-xl bg-gray-700 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">Cancel</button>
			<button type="submit" @click="addTask"
				class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-green-600 rounded-xl bg-green-600 transition ease-in-out duration-200 hover:bg-green-500 hover:border-green-500">Add
				task</button>
		</div>

	</div>

</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.25s ease;
}

.fade-move {
	transition: 0.25s ease;
}

.rotate-in-enter-to,
.rotate-in-leave-from {
	rotate: 0deg;
}

.rotate-in-enter-from,
.rotate-in-leave-to {
	rotate: -180deg;
}

.rotate-in-enter-active,
.rotate-in-leave-active {
	transition: 0.5s ease;
}

.rotate-out-enter-from,
.rotate-out-leave-to,
.rotate-out-leave-from {
	opacity: 0;
}

.rotate-out-enter-active {
	transition: 0.501s step-end;
}

.expand-enter-to,
.expand-leave-from {
	border: none;
}

.expand-enter-from,
.expand-leave-to {
	height: 100px;
}


.expand-enter-active,
.expand-leave-active {
	transition: 0.5s ease;
}
</style>
