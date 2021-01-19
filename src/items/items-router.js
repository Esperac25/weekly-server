const express = require("express");
const ItemsService = require("./items-service");
const xss = require('xss');

const itemsRouter = express.Router();

itemsRouter
  .route("/")
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then((items) => {
        if (items.length !== 0) {
          items = items.map(item => {
            return {
              item_id: item.item_id,
              description: xss(item.description), // sanitize description
            };  
          });
        }
        return items;
      })
      .then(items => res.json(items))
      .catch(next);
  })
  .post((req, res, next) => {
    const { description } = req.body;
    let newItem = { 
      description
    };

    for (const [value] of Object.entries(newItem)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing ${value} in request body` }
        });
      }
    }

    newItem = { 
      description: xss(description)
    };

    ItemsService.insertItem(
      req.app.get('db'),
      newItem
    )
      .then(item => {
        res
          .status(201)
          .location(`/items/${item.item_id}`)
          .json(item);
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
    res.json({
      item_id: res.item.item_id,
      content: xss(res.item.description), // sanitize description
      
    });
  })
  .delete((req, res, next) => {
    ItemsService.deleteItem(
      req.app.get('db'),
      req.params.item.item_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = ItemsRouter;