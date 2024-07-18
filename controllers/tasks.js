const Task = require('../models/task');
const getAllTasks  = async (req, res) => {
    try {
        const tasks = await Task.find({}); // no part directly receives data from Postman
        res.status(200).json({tasks})  // if the property name is same as variable for the value use {tasks} instead of {tasks: tasks}
    } catch (error) {
        res.status(500).json({msg: error})        
    }
}
// in postman we see json object with an array of all the objects (documents) : {[{}, {}, {}, {}]}

const createTask  = async (req, res) => {
    try {
        const task = await Task.create(req.body); // receive data from Postman
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})        
    }
}

const getTask  = async (req, res) => {
    try {
        // const taskID = req.params.id;
        const { id: taskID } = req.params; // receive data from Postman
        const task = await Task.findOne({_id: taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id : ${ taskID }`})
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({msg: error})        
    }
}

const deleteTask  = async (req, res) => {
    try {
        const {id : taskID} = req.params; // receive data from Postman
        const task = await Task.findOneAndDelete({ _id: taskID });
        if(!task){
                return res.status(404).json({msg: `No task with id : ${ taskID }`})
        }
        // res.status(200).json({task})
        // res.status(200).send()
        res.status(200).json({task: null, status: 'Success'})
    } catch (error) {
        res.status(500).json({msg: error})        
    }
}

const updateTask  = async (req, res) => {
    try {
        const {id: taskID} = req.params; // receive data from Postman
        // findOneAndUpdate(filterObject, dataToupdate, optionsObject(new))
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new:true, // returns the updated document
            runValidators: true
        })
        if(!task){
            return res.status(404).json({msg: `No task with id : ${ taskID }`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})        
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}