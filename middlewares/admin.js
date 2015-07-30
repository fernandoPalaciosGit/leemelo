// list of middlewares that express use
module.exports = {
  static: require('./static.middleware'),
  favicon: require('./favicon.middleware'),
  locals: require('./locals.middleware')
};