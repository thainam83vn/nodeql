const Filter = require(`${process.cwd()}/filter/filter`);
module.exports.parser = (req, res, next) => {
  if (req.query.filter) {
    const filter = new Filter().exec(req.query.filter);
    req.filter = filter;
  }
  console.log(req.filter);
  next();
};
