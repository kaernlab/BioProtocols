function notFound(req, res, next) {
    res.status(422);
    const error = new Error('Not able to process', req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

module.exports = {
    notFound,
    errorHandler
}