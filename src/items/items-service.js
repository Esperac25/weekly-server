const ItemsService = {
  getAllItems(db) {
    return db
      .select('*')
      .from('items');
  },
  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into('items')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(db, item_id) {
    return db
      .select('*')
      .from('items')
      .where('item_id', item_id)
      .first();
  },
  deleteItem(db, item_id) {
    return db
      .from('items')
      .where({ item_id })
      .delete();
  },
};

module.exports = ItemsService;