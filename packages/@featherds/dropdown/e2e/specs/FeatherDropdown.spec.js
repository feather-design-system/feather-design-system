const Demo = require("../pages/Demo.page");

describe("Feather Dropdown", () => {
  it("should open the menu", () => {
    const page = Demo.create();
    page.openMenu();
    page.isOpen();
  });
});
