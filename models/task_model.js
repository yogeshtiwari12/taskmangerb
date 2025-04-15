import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true

    },

    progress: {
        type: String,
        enum: ["Not Started", "In Progress", "On Hold", "Completed","Cancelled"],
        default: "In Progress",
        required: true
        
    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    priority:{
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

})
const Task = mongoose.model('Task', TaskSchema)
export default Task;