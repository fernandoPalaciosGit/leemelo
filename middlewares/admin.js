// list of middlewares that express use
module.exports = {
    cors: require('./cors.middleware'),
    staticFiles: require('./static.middleware'),
    favicon: require('./favicon.middleware'),
    locals: require('./locals.middleware')
};
