const ItemsService = {
  getAllItems(db) {
    return db
      .select('*')
      .from('items');
  },
  insertArticle(db, newItem) {
    return db
      .insert(newItem)
      .into('items')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db
      .select('*')
      .from('items')
      .where({ id: id })
      .first();
  },
  deleteItem(db, id) {
    return db
      .from('items')
      .where({ id })
      .delete();
  },
};

module.exports = ItemsService;