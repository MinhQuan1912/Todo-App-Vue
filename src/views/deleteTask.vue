<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Task "{{ task.title }}" ?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-danger" @click="deleteTask">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import api from '@/apis/handleCRUD';
const props = defineProps(['taskId']);
const task = ref({});
const emit = defineEmits(['close']);
watchEffect(async () => {
    if (props.taskId) {
        task.value = await api.findById(props.taskId);
    }
})

function closeModal() {
    emit('close');
}

async function deleteTask() {
    try {
        await api.deleteTask(props.taskId);
        closeModal();
    } catch (error) {
        console.error(error);
    }
}
</script>

<style lang="scss" scoped></style>