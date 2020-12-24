<template>
    <div v-if="currentTask" class="edit-form">
        <h4>Task</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="currentTask.title"/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" v-model="currentTask.description"/>
            </div>
            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentTask.status ? "Done" : "Pending" }}
            </div>
        </form>
        <button class="btn btn-info" v-if="currentTask.status" @click="updateStatus(false)">Change Status</button>
        <button v-else class="btn btn-info" @click="updateStatus(true)">Change Status</button>
        <button class="btn btn-danger" @click="deleteTask">Delete</button>
        <button type="submit" class="btn btn-success" @click="updateTask">Update</button>
        <p>{{ message }}</p>
        <button class="btn btn-primary"><router-link to="/">Return to List</router-link></button>
    </div>
    <div v-else>
        <br />
        <p>Please click on a Task...</p>
    </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";

export default {
    name: "task",
    data() {
        return {
            currentTask: null,
            message: ''
        };
    },
    methods: {
        getTask(id) {
            TaskDataService.get(id)
            .then(response => {
                this.currentTask = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        updateStatus(status) {
            var data = {
                id: this.currentTask.id,
                title: this.currentTask.title,
                description: this.currentTask.description,
                status: status
            };
            TaskDataService.update(this.currentTask.id, data)
            .then(response => {
                this.currentTask.status = status;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        updateTask() {
            TaskDataService.update(this.currentTask.id, this.currentTask)
            .then(response => {
                console.log(response.data);
                this.message = 'The task was updated successfully!';
            })
            .catch(e => {
                console.log(e);
            });
        },
        deleteTask() {
            TaskDataService.delete(this.currentTask.id)
            .then(response => {
                console.log(response.data);
                this.$router.push({ name: "tasks" });
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.message = '';
        this.getTask(this.$route.params.id);
    }
};
</script>

<style>
    .edit-form {
        max-width: 350px;
        margin: auto;
    }
    
    button {
        margin: 5px;
    }

    p {
        margin-top: 10px;
    }
</style>