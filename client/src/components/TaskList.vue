<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import axios from 'axios'


var list = ref([])

const deleteTask = async (task) => {
	await axios.delete(`http://localhost:5000/data/${task._id}`)
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.error(error)
		})
	getTasks()
}

const getTasks = async () => {
	await axios.get("http://localhost:5000/data")
		.then(res => {
			list.value = res.data
			console.log(list.value)
		})
		.catch(error => {
			console.error(error)
		})
}

getTasks()

defineExpose({
	getTasks
})

</script>

<template>
	<h2 class="text-xl mb-2 p-2 w-fit border-solid border-b-2 border-gray-700">Default</h2>
	<div v-for="task in list" :key="task._id" @click="deleteTask(task)"
		class="flex w-fit m-0 mb-1 p-2 rounded-xl transition ease-in-out hover:cursor-pointer hover:bg-gray-700">
		<div :key="task._id" class="m-r mr-2">
			<p :key="task._id" class="text-lg font-bold text-gray-100 m-0">
				{{ task.task }}
			</p>
			<p v-if="task.description" :key="task._id" class="text-base font-bold text-gray-500 m-0 ">
				{{ task.description }}
			</p>
		</div>
		<div v-if="!task.priority" :key="task._id" class="m-0">
			<p v-if="task.date" :key="task._id" class="text-base text-gray-400 m-0">
				{{ task.date }}
			</p>
		</div>
		<div v-else :key="task._id" class="m-0">
			<p v-if="task.date" :key="task._id" class="text-base text-red-400 m-0">
				{{ task.date }}
			</p>
		</div>
	</div>

</template>

<style scoped></style>
