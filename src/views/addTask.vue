<template>
    <form class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        @submit.prevent="addTasks">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p>Task Title</p>
                    <input class="form-control" type="text" name="" id="textInput" v-model="title">
                    
                    <div id="msg" style="color: red;" v-if="errorMessage">{{ errorMessage }}</div>
                    <br>
                    <p>Due Date</p>
                    <input class="form-control" type="date" name="" id="dateInput" v-model="date">
                    <br>
                    <p>Description</p>
                    <textarea class="form-control" name="" id="textarea" cols="30" rows="5" v-model="desc"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="submit" id="add" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/apis/handleCRUD';
const emit = defineEmits(['close']);
const title = ref('');
const date = ref('');
const desc = ref('');
const errorMessage = ref('');

function closeModal() {
    resetForm();
    emit('close');
}

async function addTasks() {
    try {
        const tasks = await api.findAll();
        const isExist = tasks.some(task => task.title === title.value);
        if (isExist) {
            errorMessage.value = 'Task nay da ton tai'
            return
        }
        if (title.value === '') {
            errorMessage.value = 'Title khong duoc de trong';
            return
        }
        await api.addTask({
            title: title.value,
            date: date.value,
            desc: desc.value
        });
        closeModal();
    } catch (error) {
        console.error(error)
    }
}
function resetForm() {
    title.value = '';
    date.value = '';
    desc.value = '';
    errorMessage.value = '';
}

</script>

<style lang="scss" scoped></style>