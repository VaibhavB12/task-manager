const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
// const getAllTasks  = asyncWrapper(async (req, res) => {
//     try {
//         const tasks = await Task.find({}); // no part directly receives data from Postman
//         res.status(200).json({tasks})  // if the property name is same as variable for the value use {tasks} instead of {tasks: tasks}
//         // res.status(200).json({tasks, amount: tasks.length})
//         // res.status(200).json({status: 'success', data: {tasks, nbHits: tasks.length}})
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// })
// // in postman we see json object with an array of all the objects (documents) : {[{}, {}, {}, {}]}

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body); // receive data from Postman
        res.status(201).json({ task })
});

const getTask = asyncWrapper(async (req, res, next) => {
        const { id: taskID } = req.params; // receive data from Postman
        const task = await Task.findOne({_id: taskID});
        if(!task){
            // const error = new Error('Not found');
            // error.status = 404;
            // return next(error);
            return next(createCustomError(`No task with id : ${ taskID }`, 404))
            // return res.status(404).json({msg: `No task with id : ${ taskID }`})
        }
        res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
        const {id : taskID} = req.params; // receive data from Postman
        const task = await Task.findOneAndDelete({ _id: taskID });
        if(!task){
            return next(createCustomError(`No task with id : ${ taskID }`, 404))
        }
        res.status(200).json({task: null, status: 'Success'})
});
    
const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params; // receive data from Postman
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new:true, // returns the updated document
        runValidators: true
    })
    if(!task){
        return next(createCustomError(`No task with id : ${ taskID }`, 404))
    }
    res.status(200).json({task})
});
    
module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};
// const createTask  = async (req, res) => {
//     try {
//         const task = await Task.create(req.body); // receive data from Postman
//         res.status(201).json({ task })
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// }

// const getTask  = async (req, res) => {
//     try {
//         // const taskID = req.params.id;
//         const { id: taskID } = req.params; // receive data from Postman
//         const task = await Task.findOne({_id: taskID});
//         if(!task){
//             const error = new Error('Not found');
//             error.status = 404;
//             return next(error);
//             return res.status(404).json({msg: `No task with id : ${ taskID }`})
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// }

// const deleteTask  = async (req, res) => {
//     try {
//         const {id : taskID} = req.params; // receive data from Postman
//         const task = await Task.findOneAndDelete({ _id: taskID });
//         if(!task){
//                 return res.status(404).json({msg: `No task with id : ${ taskID }`})
//         }
//         // res.status(200).json({task})
//         // res.status(200).send()
//         res.status(200).json({task: null, status: 'Success'})
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// }

// const updateTask  = async (req, res) => {
//     try {
//         const {id: taskID} = req.params; // receive data from Postman
//         // findOneAndUpdate(filterObject, dataToupdate, optionsObject(new))
//         const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
//             new:true, // returns the updated document
//             runValidators: true
//         })
//         if(!task){
//             return res.status(404).json({msg: `No task with id : ${ taskID }`})
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// }

// const editTask = async (req, res) => {
//     try {
//         const {id: taskID} = req.params; // receive data from Postman
//         const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
//             new:true, // returns the updated document
//             runValidators: true,
//         })
//         if(!task){
//             return res.status(404).json({msg: `No task with id : ${ taskID }`})
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({msg: error})        
//     }
// }




