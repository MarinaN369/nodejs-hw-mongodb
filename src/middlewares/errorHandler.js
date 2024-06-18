import {HttpError} from 'http-errors';

export const errorHandler = (req, res, next) => {
    res.status(500).json({
        status: 500,
        message: 'Something went wrong!',
        data: err.message,
    });
    next();
};


