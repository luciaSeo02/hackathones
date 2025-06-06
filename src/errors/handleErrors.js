const handleErrors = (error, req, res, next) => {
    res.status(error.httpStatusCode || 500).send({
        status: 'error',
        message: error.message,
    });
};

export default handleErrors;
