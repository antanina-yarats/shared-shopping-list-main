import { sql } from "../database/database.js"


const getShoppingItemsCount = async () => {
  const rows = await sql `SELECT COUNT(id) AS count FROM shopping_list_items`;
  
  if(rows && rows[0] && rows[0].count) {
    return rows[0].count;
  }

  return 0;
}

const getShoppingItems = async (listId) => {
   return await sql `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} ORDER BY collected ASC, name ASC`;
}

const addShoppingItem = async (listId, name) => {
    const rows = await sql `INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name}) RETURNING shopping_list_id`;
    return rows[0].shopping_list_id;
}

const collectShoppingItem = async (itemId) => {
    await sql `UPDATE shopping_list_items SET collected = TRUE WHERE id = ${itemId}`;
    return true;
}




export {getShoppingItemsCount, getShoppingItems, addShoppingItem, collectShoppingItem }
