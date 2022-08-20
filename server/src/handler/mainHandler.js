const SERVER_ERROR = "Server error"

class ServicesError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

/**
 * @param e : Error|ServicesError , if it has "status" property then it means it's a ServicesError,
 * and we can throw it. If not turn into a fatal server side error
 */
function handleErrors(e) {
    //Errors could be logged here
    console.log("Error Handling : " + e.message)
    if (e.status != null) throw e
    else throw new ServicesError(500, SERVER_ERROR)
}

module.exports = {
    ServicesError,
    handleErrors
}