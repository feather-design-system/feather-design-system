const DROPDOWN = "#first";
const BUTTON = "#menu-button";
const MENU = "[role='menu'";

const create = async () => {
  await browser.url("https://www.google.com");
  await (await $("body")).waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Dropdown-Demo`);
  await (await $(DROPDOWN)).waitForExist({ timeout: 60000 });

  return {
    async openMenu() {
      await (await $(BUTTON)).click();
    },
    async isOpen() {
      await (await $(MENU)).waitForDisplayed({ timeout: 60000 });
    },
  };
};

module.exports = { create };
