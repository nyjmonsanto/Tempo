<template>
    <div class="list row">
        <div class="col-md-5">
            <h4>Tasks List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(task, index) in tasks" :key="index" @click="setActiveTask(task, index)">{{ task.title }}</li>
            </ul>
            <div class="button-group">
                <button class="btn btn-sm btn-danger" @click="removeAllTasks">Remove All</button>
                <button class="btn btn-sm btn-success"><router-link to="/add">Add Task</router-link></button>
            </div>
        </div>
        <div class="col-md-5">
            <div v-if="currentTask">
                <h4>Task</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ currentTask.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currentTask.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentTask.status ? "Done" : "Pending" }}
                </div>
                <button class="btn btn-warning"><router-link :to="'/tasks/' + currentTask.id">Edit</router-link></button>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Task...</p>
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

    .btn-warning {
        margin: 0px;
    }
</style>
