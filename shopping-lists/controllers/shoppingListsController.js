import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as shoppingListsService from "../services/shoppingListsService.js"
import * as shoppingItemsService from "../services/shoppingItemsService.js"


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  
  const getStatistics = async () => {
    const data = {
        shoppingListsCount: await shoppingListsService.getShoppingListsCount(),
        shoppingItemsCount: await shoppingItemsService.getShoppingItemsCount(),
    }
    return new Response(await renderFile("index.eta", data), responseDetails);

  }

  const getActiveShoppingLists = async () => {
    const data = {
        shoppingLists: await shoppingListsService.getActiveShoppingLists(),
    };
    return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

  const addShoppingList = async (request) => {
     const formData = await request.formData();
     const name = formData.get("name");

    await shoppingListsService.addShoppingList(name);
    return await requestUtils.redirectTo("/lists");

  }

  const deactivateShoppingList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    
    await shoppingListsService.deactivateById(urlParts[2]);
    return await requestUtils.redirectTo("/lists");

  }

  const viewShoppingList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        shoppingList: await shoppingListsService.getShoppingListById(urlParts[2]),
        shoppingItems: await shoppingItemsService.getShoppingItems(urlParts[2]),
    }

    return new Response(await renderFile("shoppingItems.eta", data), responseDetails);

  }


  export { getStatistics, getActiveShoppingLists, addShoppingList, deactivateShoppingList, viewShoppingList };