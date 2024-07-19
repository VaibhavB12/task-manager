const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();

// .env contains MONGO_URI we can access it using global variable process.env 
// import env & config it 
// create async function & inside try block await connectDB function with process.env.MONGO_URI & app.listen
// await will wait until promise is resolved by connectDB if promise resolves it run app.listen
 