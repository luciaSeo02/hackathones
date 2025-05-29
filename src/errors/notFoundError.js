

const notFoundError = (req, res) => {
    res.status(404).send({
        estatus: 'error',
        message: '404 Not Found',
    });
}

export default notFoundError;