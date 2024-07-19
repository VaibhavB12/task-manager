const { CustomAPIError } = require('../errors/custom-error');
const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err);
    // the 'err' above is coming from 'next(error)' of asyncWrapper middleware
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({msg :`Something went wrong, try again later`});
    // return res.status(500).json({msg :err});
    // return res.status(err.status).json({ msg: err.message })
}

module.exports = errorHandlerMiddleware;