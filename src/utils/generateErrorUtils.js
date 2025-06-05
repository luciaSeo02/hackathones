const generateErrorUtils = (message, status, err) => {
    const error = new Error(message, { cause: err });
    error.httpStatus = status;
    return error;
};

export default generateErrorUtils;