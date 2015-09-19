// list of middlewares that express use

module.exports = {
    metaHeader: require('./metaHeader.middleware'),
    resources: require('./resources.middleware'),
    cors: require('./cors.middleware'),
    locals: require('./locals.preferences.middleware')
};
