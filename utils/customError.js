const customError = (message, status) =>{
    return {
        message,
        status,
    }
}


module.exports = customError;