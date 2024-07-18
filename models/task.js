const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)
// connect db > define schema > create & export model 