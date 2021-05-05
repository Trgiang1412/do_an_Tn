const ErrorResponse = require('./ErrorResponse')

exports.errorHandler = (err, req, res, next) => {
    let error = {...err };
    error.message = err.message
    if (err.code === 11000) {
        const message = 'truong da ton tai'
        error = new ErrorResponse(message, 401)
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message)
        error = new ErrorResponse(message, 401)

    }
    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    })
    console.log(error.status, 'error in middleware')

}