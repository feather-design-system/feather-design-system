const BUTTON = "#button";
const DRAWER = "#drawer";
const CLOSE = "[data-ref-id='dialog-close']";

const create = async () => {
  await browser.url(`https://google.com`);
  await (await $("input")).waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Drawer-Demo`);
  const button = await $(BUTTON);
  await button.waitForExist({ timeout: 60000 });
  var runInBrowser = function (argument) {
    argument.click();
  };
  return {
    async openDrawer() {
      var elementToClickOn = await $(BUTTON);
      await browser.execute(runInBrowser, elementToClickOn);
      await (await $(DRAWER)).waitForDisplayed({ timeout: 60000 });
    },
    async closeDrawer() {
      var elementToClickOn = await $(CLOSE);
      await browser.execute(runInBrowser, elementToClickOn);
      //Wait for it to hide
      await (
        await $(DRAWER)
      ).waitForDisplayed({ timeout: 60000, reverse: true });
    },
    async drawerDisplayed() {
      return await (await $(DRAWER)).isDisplayed();
    },
  };
};

module.exports = { create };
