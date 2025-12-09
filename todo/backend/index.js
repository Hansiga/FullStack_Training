//create require coding
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');    
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.post('/insert', async (req, res) => {
    const taskName = req.body.taskName;
    const completed = req.body.completed;  

    const task = new Task({
        taskName: taskName,
        completed: completed
    });

    try {
        await task.save();
        res.status(200).send("Task created successfully");
    } catch (err) {
        res.status(500).send("Error creating task");
    }
});

app.get('/read', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).send("Error retrieving tasks");
    }
});

app.put('/update', async (req, res) => {
    const id = req.body.id;
    const newTaskName = req.body.newTaskName;
    const completed = req.body.completed;

    try {
        await Task.findByIdAndUpdate(id, {
            taskName: newTaskName,
            completed: completed
        });
        res.status(200).send("Task updated successfully");
    } catch (err) {
        res.status(500).send("Error updating task");
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).send("Task deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting task");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
