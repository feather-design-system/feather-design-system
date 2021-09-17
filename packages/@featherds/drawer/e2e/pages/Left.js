const LEFTBUTTON = "#left-button";
const LEFTDRAWER = "#left-drawer [role='dialog']";
const LEFTCLOSE = "#left-drawer [data-ref-id='dialog-close']";

const create = () => {
  browser.url(`https://google.com`);
  $("input").waitForExist({ timeout: 60000 });
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Drawer-Demo`);
  $(LEFTBUTTON).waitForExist({ timeout: 60000 });
  var runInBrowser = function (argument) {
    argument.click();
  };
  return {
    openDrawer() {
      var elementToClickOn = $(LEFTBUTTON);
      browser.execute(runInBrowser, elementToClickOn);
      $(LEFTDRAWER).waitForDisplayed({ timeout: 60000 });
    },
    closeDrawer() {
      var elementToClickOn = $(LEFTCLOSE);
      browser.execute(runInBrowser, elementToClickOn);
      //Wait for it to hide
      $(LEFTDRAWER).waitForDisplayed({ timeout: 60000, reverse: true });
    },
    drawerDisplayed() {
      return $(LEFTDRAWER).isDisplayed();
    },
  };
};

module.exports = { create };
