const QueryParser = require(`${process.cwd()}/query/parser`);
module.exports.parser = (req, res, next) => {
  if (req.query.query) {
    const query = new QueryParser().exec(req.query.query);
    req.ql = query;
  }
  next();
};
