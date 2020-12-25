<template>
    <div class="edit-form">
        <div class="button-group">
            <button class="btn btn-big"><router-link to="/">RETURN TO LIST</router-link></button>
        </div><br>
        <br><h4>UPDATE TASK</h4><br>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="input-box" id="title" v-model="currentTask.title"/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="input-box" id="description" v-model="currentTask.description"/>
            </div>
            <div class="form-group">
                <label for="duedate">Due Date</label>
                <date-picker valueType="format" id="duedate" class="picker" v-model="currentTask.duedate"></date-picker>
            </div>
            <div class="form-group">
                <label for="duetime">Due Time</label>
                <vue-timepicker type="datetime" id="duetime" class="picker" v-model="currentTask.duetime" format="hh:mm A"></vue-timepicker>
            </div>
            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentTask.status ? "Done" : "Pending" }}
            </div>
        </form>
        <button class="btn btn-big change" v-if="currentTask.status" @click="updateStatus(false)">CHANGE STATUS</button>
        <button v-else class="btn btn-big change" @click="updateStatus(true)">CHANGE STATUS</button>
        <button class="btn btn-big" @click="deleteTask">DELETE</button>
        <button type="submit" class="btn btn-big" @click="updateTask">UPDATE</button>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";
import VueTimepicker from 'vue2-timepicker';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
    name: "task",
    components: {DatePicker, VueTimepicker},
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
                duedate: this.currentTask.duedate,
                duetime: this.currentTask.duetime,
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
    p {
        margin-top: 20px;
    }
    .edit-form {
        max-width: 330px;
        margin: auto;
        font-family: 'Oswald', serif;
    }
    .input-box{
        padding: 0.7rem 1rem;
        display: block;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
        outline: none;
        color: #444;
        line-height: 1.5rem;
        font-size: 1.2em;
        font-family: 'Oswald', serif;
    }
    .picker{
        display: block;
        color: #444;
        line-height: 1.5rem;
        font-family: 'Oswald', serif;
    }
</style>