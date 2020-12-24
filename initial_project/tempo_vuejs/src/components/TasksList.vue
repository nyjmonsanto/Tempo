<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>TODO LIST</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(task, index) in tasks" :key="index" @click="setActiveTask(task, index)">{{ task.title }}</li>
            </ul>
            <br>
            <button class="btn btn-big add"><router-link to="/add">ADD TASK</router-link></button>
            <button class="btn btn-big delete" @click="removeAllTasks">CLEAR ALL</button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTask">
                <h4>Due: {{ currentTask.duedate }} {{ currentTask.duetime }}</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ currentTask.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currentTask.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentTask.status ? "Done" : "Pending" }}
                </div>
                <button class="btn btn-big"><router-link :to="'/tasks/' + currentTask.id">Edit</router-link></button>
            </div>
            <div v-else>
                <br />
                <!-- <p>Please click on a Task...</p> -->
            </div>
        </div>
    </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";

export default {
    name: "tasks-list",
    data() {
        return {
            tasks: [],
            currentTask: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrieveTasks() {
            TaskDataService.getAll()
            .then(response => {
                this.tasks = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        refreshList() {
            this.retrieveTasks();
            this.currentTask = null;
            this.currentIndex = -1;
        },
        setActiveTask(task, index) {
            this.currentTask = task;
            this.currentIndex = index;
        },
        removeAllTasks() {
            TaskDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.retrieveTasks();
    }
};
</script>

<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>