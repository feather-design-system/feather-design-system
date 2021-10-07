const Demo = require("../pages/Demo.page");

describe("Feather Dropdown", () => {
  it("should open the menu", async () => {
    const page = await Demo.create();
    await page.openMenu();
    await page.isOpen();
  });
});
