<template>
  <div class="app">
    <div class="header">
      <h4 class="mb-3">Todo App</h4>
      <div id="addNew" data-bs-toggle="modal" data-bs-target="#addModal">
        <span>Add New Task</span>
        <i class="fa-solid fa-plus"></i>
      </div>
      <h5 class="text-center my-3">Tasks</h5>
    </div>
    <AddTask @close="closeAddModal" ref="addTaskRef"></AddTask>
    <EditTask :taskId="selectedTaskId" @close="closeEditModal" ref="editTaskRef"></EditTask>
    <DeleteTask :taskId="selectedTaskId" @close="closeDeleteModal" ref="deleteTaskRef"></DeleteTask>
    <div id="tasks">
      <template v-if="tasks.length !== 0">
        <template v-for="task in tasks" :key="task.id">
          <div>
            <span class="fw-bold" id="task-name">{{ task.title }}</span>
            <span class="small text-secondary" id="task-date">{{ task.date }}</span>
            <p id="task-description">{{ task.desc }}</p>
            <span class="options">
              <i class="fa-solid fa-pen-to-square" @click="openEditModal(task.id)"></i>
              <i class="fa-solid fa-trash" @click="openDeleteModal(task.id)"></i>
            </span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup>
import AddTask from '@/views/addTask.vue';
import EditTask from '@/views/editTask.vue';
import DeleteTask from '@/views/deleteTask.vue';
import { ref, onMounted } from 'vue';
import api from '@/apis/handleCRUD';
const tasks = ref([]);
const selectedTaskId = ref('');
const addTaskRef = ref(null);
const editTaskRef = ref(null)
const deleteTaskRef= ref(null)
onMounted(loadTasks);
async function loadTasks() {
  try {
    tasks.value = await api.findAll();
  }
  catch (error) {
    console.error(error);
  }
}

async function openEditModal(taskId) {
  selectedTaskId.value = taskId;
  const editModal = new bootstrap.Modal(editTaskRef.value.editModalRef);
  editModal.show();
}

function closeEditModal() {
  selectedTaskId.value = '';
  const editModal = bootstrap.Modal.getInstance(editTaskRef.value.editModalRef);
  if (editModal) {
    editModal.hide();
  }
  loadTasks();
}
function closeAddModal() {
  const addModal = bootstrap.Modal.getInstance(addTaskRef.value.modalRef);
  if (addModal) {
    addModal.hide();
  }
  loadTasks();
}

async function openDeleteModal(taskId) {
  selectedTaskId.value = taskId;
  const deleteModal = new bootstrap.Modal(deleteTaskRef.value.deleteModalRef);
  deleteModal.show();
}

function closeDeleteModal() {
  selectedTaskId.value = '';
  const deleteModal = bootstrap.Modal.getInstance(deleteTaskRef.value.deleteModalRef);
  if (deleteModal) {
    deleteModal.hide();
  }
  loadTasks();
}
</script>

<style scoped></style>