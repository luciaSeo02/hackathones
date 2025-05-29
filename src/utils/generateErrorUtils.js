const generateErrorUtils = (message, status) => {
    const error = new Error(message);
    error.httpStatus = status;
    return error;
}

export default generateErrorUtils;