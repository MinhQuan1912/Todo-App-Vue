<template>
    <form ref="editModalRef" class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        @submit.prevent="editTask">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">Edit Task</h1>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p>Task Title</p>
                    <input class="form-control" type="text" v-model="title">
                    <div id="msg"></div>
                    <br>
                    <p>Due Date</p>
                    <input class="form-control" type="date" v-model="date">
                    <br>
                    <p>Description</p>
                    <textarea class="form-control" cols="30" rows="5" v-model="desc"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="editTask">Save changes</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import api from '@/apis/handleCRUD';
const emit = defineEmits(['close']);
const title = ref('');
const date = ref('');
const desc = ref('');
const task = ref({});
const props = defineProps(['taskId']);
const editModalRef = ref(null)
defineExpose({ editModalRef });
watchEffect(async () => {
    if (props.taskId) {
        try {
            task.value = await api.findById(props.taskId);
            title.value = task.value.title;
            date.value = task.value.date;
            desc.value = task.value.desc;
        } catch (error) {
            console.error(error);
        }
    }
});

async function editTask() {
    try {
        await api.changeTask(props.taskId, {
            title: title.value,
            date: date.value,
            desc: desc.value
        })
        closeModal();
    } catch (error) {
        console.error(error)
    }
}
function closeModal() {
    emit('close');
}
</script>

<style lang="scss" scoped></style>