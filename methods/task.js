import Task from "../models/task_model.js"; 



export const createTask = async (req, res) => {
    try {
        const { title, description, deadline, progress, priority } = req.body;
        const userId = req.user._id;

        const progressMap = {
            "In Progress": 50,
            "On Hold": 25,
            "Cancelled": 0,
            "Completed": 100
        };

        const task = new Task({
            title,
            description,
            deadline,
            progress,
            priority,
            userId,
            progressPercentage: progressMap[progress] ?? 0 
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });

    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};



export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        let task2 = req.body;

        if(task2.progress === "Completed"){
            task2.completed = true;    
        } 
        else{
            task2.completed = false;    
        }

        if(task2.progress === "In Progress"){
            task2.progressPercentage = 50;    
        }
        else if(task2.progress === "On Hold"){
            task2.progressPercentage = 25;    
        }
        else if(task2.progress === "Cancelled"){
            task2.progressPercentage = 0;    
        }
        else if(task2.progress === "Completed"){
            task2.progressPercentage = 100;    
        }


        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
}


export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
}

export const getUserTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
}

