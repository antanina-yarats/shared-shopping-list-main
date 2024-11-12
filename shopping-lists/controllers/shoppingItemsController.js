
import * as requestUtils from "../utils/requestUtils.js";
import * as shoppingItemsService from "../services/shoppingItemsService.js"



const addShoppingItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];
    const formData = await request.formData();
    const name = formData.get("name");
    await shoppingItemsService.addShoppingItem(listId, name);
    return requestUtils.redirectTo(`/lists/${listId}/items`);
}

const collectShoppingItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];
    const itemId = urlParts[4];

    await shoppingItemsService.collectShoppingItem(itemId);
    return requestUtils.redirectTo(`/lists/${listId}`);
}



export { addShoppingItem, collectShoppingItem };

