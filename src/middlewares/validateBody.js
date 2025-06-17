const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        console.log(error);
        

        if (error) {
            const messages = error.details.map((e) => e.message);
            return res.status(400).json({ error: messages });
        }

        next();
    };
};

export default validateBody;
