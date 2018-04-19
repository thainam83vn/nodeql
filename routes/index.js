const express = require("express");
const router = express.Router();
const queryHelper = require(`${process.cwd()}/query/helper`);
const filterHelper = require(`${process.cwd()}/filter/helper`);
const DocumentNames = ["customer", "order"];
const GeneralControllerClass = require(`${process.cwd()}/controllers/general`);

DocumentNames.forEach(modelName => {
  const model = require(`${process.cwd()}/models/${modelName}`);
  const controller = new GeneralControllerClass(model);
  const route = router.route(`/${modelName}/:id?`);
  route.get(queryHelper.parser, filterHelper.parser, async (req, res) => {
    // res.json({ message: `Welcome to ${modelName}` });
    if (req.params.id) {
      try {
        res.json(await controller.single(req, res));
      } catch (err) {
        throw new Error(err.message);
      }
    } else {
      try {
        res.json(await controller.index(req, res));
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  });

  route.post(async (req, res) => {
    try {
      res.json(await controller.create(req, res));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  route.patch(async (req, res) => {
    try {
      res.json(await controller.update(req, res));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  route.delete(async (req, res) => {
    try {
      res.json(await controller.delete(req, res));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
});
module.exports = router;
