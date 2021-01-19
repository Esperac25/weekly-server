const express = require("express");
const ItemsService = require("./items-service");
const xss = require('xss');
const jsonParser = express.json();
const itemsRouter = express.Router();

const serializeItem = (item) => ({
    item_id: item.item_id,
    description: xss(item.description),
});

itemsRouter
  .route('/')
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then((items) => {
        return res.json(items.map(serializeItem))
      })
      .catch(next);
  })
  .post(jsonParser,(req, res, next) => {
    const { description: newDescription } = req.body;
    const newItem = { 
      description: newDescription
    };

    for (const [value] of Object.entries(newItem)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing ${value} in request body` }
        });
      }
    }

    ItemsService.insertItem(
      req.app.get('db'),
      newItem
    )
      .then(item => {
        res
          .status(201)
          .location(`/api/items/${item.item_id}`)
          .json(serializeItem(item));
      })
      .catch(next);
  });

itemsRouter
  .route('/:item_id')
  .all((req, res, next) => {
    ItemsService.getById(
      req.app.get('db'),
      req.params.item_id
    )
      .then(item => {
        if (!item) {
          return res.status(404).json({
            error: { message: `item doesn't exist` }
          });
        };
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.item)
  })
  .delete((req, res, next) => {
    ItemsService.deleteItem(
      req.app.get('db'),
      req.params.item_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = itemsRouter;