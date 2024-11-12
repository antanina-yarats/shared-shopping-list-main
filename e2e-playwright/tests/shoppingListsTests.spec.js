const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto('/lists');
    const lists = page.locator('ul li');
    let count = await lists.count();

    while (count > 0) {
        for (let i = 0; i < count; i++) {
            await lists.nth(i).getByRole('button', { name: "Deactivate list!" }).click();
        }
        await page.waitForTimeout(500); 
        count = await lists.count();
    }
    
    await expect(lists).toHaveCount(0);
});

test("The title has text 'app'", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("app");
});

test("The nav link has text 'All shopping lists' ", async ({ page }) => {
    await page.goto("/");
    await page.click("text='All shopping lists'");
    await expect(page).toHaveURL("/lists");
});

test("List can be added", async ({ page }) => {
    const uniqueListName = `list${Math.random()}`;
    await page.goto('/lists');
    await page.locator('input[type="text"]').type(uniqueListName);
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.locator("ul")).toHaveCount(1);
    await expect(page.locator(`a >> text='${uniqueListName}'`)).toHaveText(uniqueListName);
});

test("Can add an item to the list", async ({ page }) => {
    const uniqueListName = `list${Math.random()}`;
    const uniqueItemName = `item${Math.random()}`; 
    await page.goto('/lists');
    await page.locator('input[type="text"]').type(uniqueListName);
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.locator(`a >> text='${uniqueListName}'`)).toBeVisible();
    await page.locator(`a >> text='${uniqueListName}'`).click(); 
    await page.locator('input[type="text"]').type(uniqueItemName);
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(page.getByRole('listitem')).toContainText(uniqueItemName);
});

test("Item can be collected", async({page })=> {
    const uniqueListName = `list${Math.random()}`; 
    const uniqueItemName = `item${Math.random()}`;
    await page.goto('/lists');
    await page.locator('input[type="text"]').type(uniqueListName);
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.locator(`a >> text='${uniqueListName}'`)).toBeVisible();
    await page.locator(`a >> text='${uniqueListName}'`).click();
    await expect(page.locator('h1')).toHaveText(uniqueListName);
    await page.locator('input[type="text"]').type(uniqueItemName);
    await page.getByRole('button', {name: "ADD"}).click();
    await expect(page.locator('.listItem')).toHaveCount(1);
    await page.getByRole('button', {name: "Mark collected!"}).click();
    await expect(page.locator('del')).toHaveText(uniqueItemName);
});

test("list can be removed and once removed it no longer appears", async({page})=> {
    const uniqueListName = `list${Math.random()}`;
    await page.goto('/lists');
    await page.locator("input[type='text']").type(uniqueListName);
    await page.getByRole('button', {name: "ADD"}).click();
    await expect(page.locator(`a >> text='${uniqueListName}'`)).toBeVisible();
    await page.getByRole('button', { name: "Deactivate list!" }).click();
    await expect(page.locator(`text=${uniqueListName}`)).not.toBeVisible(); 
    });

test("Empty input cannot be added as a list", async ({ page }) => {
    
    await page.goto('/lists');
    await expect(page.locator('li')).toHaveCount(0);
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.locator('li')).toHaveCount(0);
    });
    
test("Empty input cannot be added as an item", async ({ page }) => {
    
    await page.goto('/lists');
    const uniqueListName = `list${Math.random()}`;
    await page.locator('input[type="text"]').type(uniqueListName);
    await page.getByRole('button', { name: "ADD" }).click();
    await page.locator(`a >> text='${uniqueListName}'`).click();
    await page.getByRole('button', { name: "ADD" }).click();
    await expect(page.getByRole('listitem')).toHaveCount(0);
    });

      






