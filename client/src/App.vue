<script setup>
import { ref } from 'vue'
import axios from 'axios'
import TaskList from './components/TaskList.vue'
import InputTask from './components/InputTask.vue'

const list = ref();

const onPost = async () => {
	await list.value.getTasks()
}

const onCategory = (category) => {
	list.value.setSortCategory(category)

}

</script>

<template>
	<div class=" w-[800px] m-0 p-3">
		<TaskList ref="list" />
		<InputTask @post="onPost" @category="onCategory" />
	</div>
</template>

<style scoped></style>
