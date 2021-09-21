const LEFTBUTTON = "#left-button";
const LEFTDRAWER = "#left-drawer [role='dialog']";
const LEFTCLOSE = "#left-drawer [data-ref-id='dialog-close']";

const create = async () => {
  await browser.url(`https://google.com`);
  await (await $("input")).waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Drawer-Demo`);
  const button = await $(LEFTBUTTON);
  await button.waitForExist({ timeout: 60000 });
  var runInBrowser = function (argument) {
    argument.click();
  };
  return {
    async openDrawer() {
      var elementToClickOn = await $(LEFTBUTTON);
      await browser.execute(runInBrowser, elementToClickOn);
      await (await $(LEFTDRAWER)).waitForDisplayed({ timeout: 60000 });
    },
    async closeDrawer() {
      var elementToClickOn = await $(LEFTCLOSE);
      await browser.execute(runInBrowser, elementToClickOn);
      //Wait for it to hide
      await (
        await $(LEFTDRAWER)
      ).waitForDisplayed({ timeout: 60000, reverse: true });
    },
    async drawerDisplayed() {
      return await (await $(LEFTDRAWER)).isDisplayed();
    },
  };
};

module.exports = { create };
