const BUTTON = "#button";
const DRAWER = "#drawer [role='dialog']";
const CLOSE = "#drawer [data-ref-id='dialog-close']";

const create = () => {
  browser.url(`https://google.com`);
  $("input").waitForExist({ timeout: 60000 });
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Drawer-Demo`);
  $(BUTTON).waitForExist({ timeout: 60000 });
  var runInBrowser = function (argument) {
    argument.click();
  };
  return {
    openDrawer() {
      var elementToClickOn = $(BUTTON);
      browser.execute(runInBrowser, elementToClickOn);
      $(DRAWER).waitForDisplayed({ timeout: 60000 });
    },
    closeDrawer() {
      var elementToClickOn = $(CLOSE);
      browser.execute(runInBrowser, elementToClickOn);
      //Wait for it to hide
      $(DRAWER).waitForDisplayed({ timeout: 60000, reverse: true });
    },
    drawerDisplayed() {
      return $(DRAWER).isDisplayed();
    },
  };
};

module.exports = { create };
