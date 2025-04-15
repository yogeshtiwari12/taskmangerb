import express from 'express';
import { createTask, deleteTask, getTaskById, getUserTasks, updateTask } from '../methods/task.js';
import { verifytoken } from '../auth/auth.js';



const router = express.Router();

router.post('/createtask',verifytoken,createTask)
router.get('/getusertask',verifytoken,getUserTasks)

router.get('/gettaskbyid/:id',verifytoken,getTaskById)
router.delete('/deletetask/:id',verifytoken,deleteTask)
router.post('/updatetask/:id',verifytoken,updateTask)


export default router;