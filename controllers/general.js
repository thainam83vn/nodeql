module.exports = class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  filter(req) {
    if (!req.query.filter) return null;
    let filter = req.query.filter;
  }

  removeBalckList(body) {
    let newBody = {};
    let blacklist = this.Model.blacklist();
    for (let key in body) {
      if (blacklist.indexOf(key) < 0) {
        newBody[key] = body[key];
      }
    }
    return newBody;
  }

  index(req, res) {
    return new Promise((resolve, reject) => {
      let query = this.Model.find(req.filter);
      if (req.ql) {
        let ql = req.ql.query;
        let selects = Object.keys(ql).filter(key => ql[key] === true);
        query.select(selects.join(" "));
        let populates = Object.keys(ql).filter(key => ql[key] !== true);
        populates.forEach(key =>
          query.populate({ path: key, select: Object.keys(ql[key]).join(" ") })
        );
      }
      query.exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  single(req, res) {
    return new Promise((resolve, reject) => {
      let query = this.Model.findById(req.params.id);
      if (req.ql) {
        let ql = req.ql.query;
        let selects = Object.keys(ql).filter(key => ql[key] === true);
        query.select(selects.join(" "));
        let populates = Object.keys(ql).filter(key => ql[key] !== true);
        populates.forEach(key =>
          query.populate({ path: key, select: Object.keys(ql[key]).join(" ") })
        );
      }
      query.exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  create(req, res) {
    return new Promise((resolve, reject) => {
      let obj = new this.Model(req.body);
      obj.save(req.body, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  delete(req, res) {
    return new Promise((resolve, reject) => {
      this.Model.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  update(req, res) {
    return new Promise((resolve, reject) => {
      let body = this.removeBalckList(req.body);
      console.log(req.params.id, body);
      this.Model.update({ _id: req.params.id }, body, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
};
