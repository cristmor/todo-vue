<script setup>
import { ref } from 'vue'
import axios from 'axios'

const backend = ref("")

// Tasks refs
var tasks = ref([])

// Input refs
var datePicker = ref(null)
var toggleDate = ref(false)

var item = ref({
	id: 0,
	task: "",
	description: "",
	date: "",
	priority: false,
	category: ""
})

var categories = ref([])
var toggleCategories = ref(false)
var selectedCategory = ref("Default")


// Tasks Methods
const deleteTask = async (task) => {
	await axios.delete(`${backend.value}/data/${task._id}`)
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.error(error)
		})
	fetchTasks()
}

const fetchTasks = async () => {
	await axios.get(`${backend.value}/data`)
		.then(res => {
			tasks.value = res.data
			console.log("tasks:", tasks.value)
		})
		.catch(error => {
			console.error(error)
		})
}

fetchTasks()


// Input Methods
const addTask = async () => {
	if (item.value.task.trim() !== "") {
		item.value.category = selectedCategory;
		await axios.post(`${backend.value}/data`, item.value)
			.then(res => {
				console.log(res)
			})
			.catch(error => {
				console.error(error)
			})
		fetchTasks()
		clearTask()
	}
}

const clearTask = () => {
	item.value = {
		id: item.value.id,
		task: "",
		description: "",
		date: "",
		priority: false,
		category: ""
	}
	toggleDate.value = false
}

const setDate = (b) => {
	if (b) {
		toggleDate.value = true;
		datePicker.value.showPicker()
	}
	else {
		toggleDate.value = false;
		datePicker.value.blur();
		item.value.date = ""
	}
}

const setPriority = () => {
	item.value.priority = !item.value.priority
}

const showCategories = async () => {
	fetchCategories()
	toggleCategories.value = !toggleCategories.value
}

const setCategory = (category) => {
	toggleCategories.value = !toggleCategories.value
	if (category.trim() === "") {
		return
	}
	selectedCategory.value = category
}

const fetchCategories = async () => {
	await axios.get(`${backend.value}/category`)
		.then(res => {
			categories.value = res.data
			console.log("categories", categories.value)
		})
		.catch(error => {
			console.error(error)
		})
}

fetchCategories()


</script>

<template>

	<div class=" w-[430px] m-0 p-3">
		<TransitionGroup name="app" mode="out-in" appear>
			<h2 class="text-xl mb-2 p-2 w-fit border-solid border-b-2 border-gray-700">{{ selectedCategory
				}}
			</h2>
			<div v-for=" task in tasks.filter(task => task.category === selectedCategory)" :key="task._id"
				@click="deleteTask(task)"
				class="flex m-0 mb-1 px-4 py-2 rounded-xl transition ease-in-out hover:cursor-pointer hover:bg-gray-700">
				<div :key="task._id" class="m-r mr-2">
					<p :key="task._id" class="text-lg font-bold text-gray-100 m-0">
						{{ task.task }}
					</p>
					<p :key="task._id" class="text-base font-bold text-gray-500 m-0 ">
						{{ task.description }}
					</p>
				</div>
				<div class="m-auto mr-0">
					<p v-if="!task.priority" :key="task._id + 0"
						class="text-base text-gray-400 mr-0">
						{{ task.date }}
					</p>
					<p v-else :key="task._id + 1" class="text-base text-red-400 mr-0">
						{{ task.date }}
					</p>

				</div>

			</div>


			<div class="flex-col mt-2 p-0 w-full border-solid border-2 rounded-2xl border-gray-400">
				<div class="flex-col m-0 p-4 border-solid border-b-2 border-gray-700">
					<div class="flex">
						<div>
							<input v-model="item.task" type="text" placeholder="Task Name"
								class="block text-lg font-bold text-white w-48 m-0 mb-1 border-none outline-none bg-transparent placeholder:text-gray-400">
							<input v-model="item.description" type="text"
								class="block text-lg font-bold text-white w-48 m-0 mb-1 border-none outline-none bg-transparent placeholder:text-gray-500"
								placeholder="Description">
						</div>
						<p v-if="!item.priority"
							class="text-lg font-bold text-gray-500 m-auto mr-0"> {{
								item.date
							}}
						</p>
						<p v-else class="text-lg font-bold text-red-400 m-auto mr-0"> {{
							item.date }}
						</p>
					</div>

					<div class="pt-2">
						<div class="flex">
							<div v-if="!toggleDate" @click="setDate(true)" class="select-none cursor-pointer flex align-middle w-fit m-0 mr-2 px-4 pl-3 py-2 border-solid border-2 border-gray-500
						rounded-xl transition ease-in-out duration-200 hover:bg-gray-500">
								<svg class=" m-auto mr-2 h-5 w-5 text-white" width="24"
									height="24" viewBox="0 0 24 24" stroke-width="2"
									stroke="currentColor" fill="none"
									stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" />
									<rect x="4" y="5" width="16" height="16"
										rx="2" />
									<line x1="16" y1="3" x2="16" y2="7" />
									<line x1="8" y1="3" x2="8" y2="7" />
									<line x1="4" y1="11" x2="20" y2="11" />
									<line x1="11" y1="15" x2="12" y2="15" />
									<line x1="12" y1="15" x2="12" y2="18" />
								</svg>
								<p class="text-lg font-bold
						text-white">Date</p>

							</div>
							<div v-else @click="setDate(false)" class="select-none cursor-pointer flex align-middle w-fit m-0 mr-2 px-4 pl-3 py-2 border-solid border-2 border-gray-500
						rounded-xl bg-gray-500 transition ease-in-out duration-200 hover:bg-gray-600 hover:border-gray-600">
								<svg class="m-auto mr-2 h-5 w-5 text-white" width="24"
									height="24" viewBox="0 0 24 24" stroke-width="2"
									stroke="currentColor" fill="none"
									stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" />
									<rect x="4" y="5" width="16" height="16"
										rx="2" />
									<line x1="16" y1="3" x2="16" y2="7" />
									<line x1="8" y1="3" x2="8" y2="7" />
									<line x1="4" y1="11" x2="20" y2="11" />
									<line x1="11" y1="15" x2="12" y2="15" />
									<line x1="12" y1="15" x2="12" y2="18" />
								</svg>
								<p class="text-lg font-bold
						text-white">Date</p>
							</div>


							<div v-if="!item.priority" @click="setPriority" class="select-none cursor-pointer flex algin-middle m-0 px-4 pl-3 py-2 border-solid
						border-2 border-gray-500 rounded-xl transition ease-in-out duration-200
						hover:bg-red-600 hover:border-red-600">
								<svg class="m-auto mr-2 h-5 w-5 text-white"
									viewBox="0 0 24 24" fill="none"
									stroke="currentColor" stroke-width="2"
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
								<svg class="m-auto mr-2 h-5 w-5 text-white"
									viewBox="0 0 24 24" fill="none"
									stroke="currentColor" stroke-width="2"
									stroke-linecap="round" stroke-linejoin="round">
									<path
										d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
									<line x1="4" y1="22" x2="4" y2="15" />
								</svg>
								<p class="text-lg font-bold text-white">Priority</p>
							</div>
						</div>
						<input v-model="item.date" ref="datePicker" type="date"
							class="hidden" />
						<!-- <button>Reminders</button> -->
						<!-- <button>Extra</button> -->
					</div>
				</div>

				<div class="flex justify-center align-middle m-0 p-2 h-16">
					<div
						class="m-auto ml-0 mr-2 border-solid border-2 border-gray-500 rounded-xl bg-[#141414] overflow-hidden select-none hover:cursor-pointer">
						<div @click="showCategories"
							class="z-10 flex align-middle m-auto px-4 py-2 pr-3 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
							<p class="text-lg font-bold text-white m-0 ml-0">
								{{
									selectedCategory }}
							</p>

							<Transition name="rotate-in">
								<svg v-if="!toggleCategories"
									class="h-4 w-4 p-0 m-auto ml-2 text-white inline"
									width="24" height="24" viewBox="0 0 24 24"
									stroke-width="2" stroke="currentColor"
									fill="none" stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" />
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</Transition>

							<Transition name="rotate-out">
								<svg v-if="toggleCategories"
									class="h-4 w-4 p-0 m-auto ml-2 text-white inline"
									width="24" height="24" viewBox="0 0 24 24"
									stroke-width="2" stroke="currentColor"
									fill="none" stroke-linecap="round"
									stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" />
									<polyline points="6 15 12 9 18 15" />
								</svg>
							</Transition>


						</div>
						<TransitionGroup name="fade">
							<div v-if="toggleCategories"
								v-for="category in categories.filter(category => category !== selectedCategory)"
								@click="setCategory(category)"
								class="z-0 border-solid border-t-2 border-gray-700">
								<p
									class="text-lg font-bold text-white m-auto px-4 py-2 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500">
									{{ category }} </p>
							</div>
							<input v-if="toggleCategories" v-model="item.category"
								@keydown.enter="setCategory(item.category)"
								placeholder="New Category"
								class="text-lg font-bold text-white m-auto px-4 py-2 border-solid border-t-2 border-gray-700 w-[155px] bg-transparent transition ease-in-out duration-200 outline-none hover:bg-gray-500 hover:border-gray-500" />
						</TransitionGroup>
					</div>
					<button @click="clearTask"
						class="text-lg font-bold text-white m-auto mr-2 px-4 py-2 border-solid border-2 border-gray-700 rounded-xl bg-gray-700 transition ease-in-out duration-200 hover:bg-gray-500 hover:border-gray-500 active:bg-gray-500 active:border-gray-500">Cancel</button>
					<button type="submit" @click="addTask"
						class="text-lg font-bold text-white m-0 px-4 py-2 border-solid border-2 border-green-600 rounded-xl bg-green-600 transition ease-in-out duration-200 hover:bg-green-500 hover:border-green-500 active:bg-green-500 active:border-green-500">Add
						task</button>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.app-enter-from,
.app-leave-to {
	opacity: 0;
	transform: scale(0.5);
}

.app-enter-active {
	transition: 0.5s ease;
}

.app-leave-active {
	position: absolute;
	transition: 0.5s ease;
}

.app-move {
	transition: 0.5s ease;
}

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

.expand-move {
	transition: 0.5s ease;
}
</style>
