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
                <label for="duedate">Due Date</label><br>
                <date-picker required v-model="task.duedate" id="duedate" class="picker" valueType="format" name="duedate"></date-picker>
            </div>
            <div class="form-group">
                <label for="duetime">Due Time</label><br>
                <vue-timepicker required v-model="task.duetime" id="duetime" class="picker" type="datetime" format="hh:mm A" name="duetime"></vue-timepicker>
            </div>
            <button @click="saveTask" class="btn btn-big add" style="margin-top: 20px;">ADD TO LIST</button>
        </div>
        <div v-else>
            <h4>Added successfully!</h4>
        </div>
    </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";
import VueTimepicker from 'vue2-timepicker';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
    name: "add-task",
    components: {DatePicker, VueTimepicker},
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
    }
};
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
    .picker{
        display: block;
        color: #444;
        line-height: 1.5rem;
        font-family: 'Oswald', serif;
    }
</style>