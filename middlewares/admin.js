// list of middlewares that express use
module.exports = {
    staticFiles: require('./static.middleware'),
    bodyParserExtend: require('./bodyParser.extend.middleware'),
    bodyParserJson: require('./bodyParser.json.middleware'),
    favicon: require('./favicon.middleware'),
    locals: require('./locals.middleware')
};