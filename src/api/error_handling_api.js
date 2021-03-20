function errorHandling(error) {
    let errMessage;
    if (error.response) {
        console.log(error.response.Headers)
    }
    if (error.message) {
        errMessage = error.message;
    } else if (error.request) {
        // The request was made but no response was received
        errMessage = error.request;
    }
    return errMessage;
}

export default errorHandling