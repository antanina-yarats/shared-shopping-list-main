
import { configure } from "./deps.js";
import * as shoppingListsController from "./controllers/shoppingListsController.js";
import * as shoppingItemsController from "./controllers/shoppingItemsController.js";
import * as requestUtils from "./utils/requestUtils.js"


configure({
    views: `${Deno.cwd()}/shopping-lists/views/`,
});

const handleRequest = async (request) => {

    const url = new URL(request.url);

    //more specific 

    if(url.pathname.match(/^\/lists\/[0-9]+\/items\/[0-9]+\/collected$/) && request.method === "POST"){
        return await shoppingItemsController.collectShoppingItem(request);
    } 

    else if (url.pathname.match(/^\/lists\/[0-9]+\/items$/) && request.method === "POST") {
        return await shoppingItemsController.addShoppingItem(request);
    }

    else if (url.pathname.match(/^\/lists\/[0-9]+\/deactivate$/) && request.method === "POST") {
        return await shoppingListsController.deactivateShoppingList(request);
    }

    //less specific 

    else if (url.pathname.match(/^\/lists\/[0-9]+$/) && request.method === "GET") {
        return await shoppingListsController.viewShoppingList(request);
    }

    else if (url.pathname.match(/^\/lists\/[0-9]+\/items$/) && request.method === "GET") {
        return await shoppingListsController.viewShoppingList(request);
    }

    else if (url.pathname === "/lists" && request.method === "GET") {
        return await shoppingListsController.getActiveShoppingLists(request);
    }

    else if (url.pathname ==="/lists" && request.method === "POST") {
        return await shoppingListsController.addShoppingList(request);
    }

    else if (url.pathname === "/" && request.method === "GET") {
         return await shoppingListsController.getStatistics(request);
    }

    else {
        return requestUtils.redirectTo("/");
    }
    
}

const port = Number(Deno.env.get("PORT")) || 7777;
console.log(`Server is running on: http://0.0.0.0:${port}/`);
Deno.serve({ hostname: "0.0.0.0", port }, handleRequest);
