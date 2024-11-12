import { sql } from '../database/database.js';


const getShoppingListsCount = async () => {
   const rows = await sql `SELECT COUNT(id) AS count FROM shopping_lists`;

   if (rows && rows[0] && rows[0].count) {
    return rows[0].count;
   }

   return 0;
}


const getActiveShoppingLists = async () => {
    const rows = await sql `SELECT * FROM shopping_lists WHERE active IS TRUE`;

    return rows;
}

const addShoppingList  = async (name) => {
    const rows = await sql `INSERT INTO shopping_lists (name) VALUES (${name}) RETURNING id`;
    return rows[0].id;
}

const deactivateById = async (listId) => {
     await sql `UPDATE shopping_lists SET active = FALSE WHERE id = ${listId}`;
     return true;
}

const getShoppingListById = async (listId) => {
   const rows =  await sql `SELECT * FROM shopping_lists WHERE id = ${listId}`;

   if (rows && rows.length > 0) {
    return rows[0];
   } 

   return null;
}




export { getActiveShoppingLists, addShoppingList, deactivateById, getShoppingListById, getShoppingListsCount };







