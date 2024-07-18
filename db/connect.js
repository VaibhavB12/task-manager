const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://vbn:ccbgSJmFWqeLBh24@cluster0.r413wgz.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0'

// mongoose
// .connect(connectionString)
// .then(() => {
    //     console.log('CONNECTED TO DB...') ;
    // })
    // .catch((err) => {console.log(err)})


    // const connectDB = (url) => {
//     return mongoose.connect(connectionString) // we are returning promise here
// }


const connectDB = (url) => {
    return mongoose.connect(url) // connect method returns promise & we handle that promise with async-await
}
    
module.exports = connectDB;