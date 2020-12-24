<template>
 <div class="submit-form">
        <div class="button-group">
            <button class="btn btn-big"><router-link to="/">RETURN TO LIST</router-link></button>
        </div><br>
        <br><h4>ADD TASK</h4><br>
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required v-model="task.title" name="title"/>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" required v-model="task.description" name="description"/>
            </div>
            <div class="form-group">
                <label for="duedate">Due Date</label>
                <input type="text" class="form-control" id="duedate" required v-model="task.duedate" name="duedate"/>
            </div>
            <div class="form-group">
                <label for="duetime">Due Time</label>
                <input type="text" class="form-control" id="duetime" required v-model="task.duetime" name="duetime"/>
            </div>
            <button @click="saveTask" class="btn btn-big add">ADD TO LIST</button>
        </div>
        <div v-else>
            <h4>Added successfully!</h4>
            <button class="btn btn-big add" @click="newTask">CLICK HERE TO ADD NEW TASK</button>
        </div>
    </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";

export default {
    name: "add-task",
    data() {
        return {
            task: {
                id: null,
                title: "",
                description: "",
                duedate: "",
                duetime: "",
                status: false
            },
            submitted: false
        };
    },
    methods: {
        saveTask() {
            var data = {
                title: this.task.title,
                description: this.task.description,
                duedate: this.task.duedate,
                duetime: this.task.duetime
            };
            
            TaskDataService.create(data)
            .then(response => {
                this.task.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
        newTask() {
            this.submitted = false;
            this.task = {};
        }
    }
};
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>